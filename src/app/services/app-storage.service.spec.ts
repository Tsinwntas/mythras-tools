import { AppStorageService } from './app-storage.service';
import { hydrateCharacter } from './character-format';
describe('Character storage safety', () => {
    let service: AppStorageService;
    beforeEach(() => { localStorage.clear(); service = new AppStorageService(); });
    afterEach(() => localStorage.clear());
    it('keeps malformed raw data before opening a safe new draft', () => {
        localStorage.setItem('creation-character', '{damaged');
        const recovered = service.readCharacter('creation-character');
        expect(recovered.skills.skills.length).toBeGreaterThan(0);
        expect(localStorage.getItem('recovery-creation-character')).toBe('{damaged');
        expect(localStorage.getItem('creation-character')).toBe('{damaged');
        expect(service.error).toContain('recovery');
    });
    it('lists valid characters even when another save is malformed', () => {
        localStorage.setItem('character-broken', 'bad');
        localStorage.setItem('character-good', JSON.stringify({ id: 'good', name: 'Good', skills: {} }));
        expect(service.listCharacters().map(c => c.id)).toEqual(['good']);
        expect(localStorage.getItem('character-broken')).toBe('bad');
    });
    it('synchronizes only active copies of the same character', () => {
        const character = hydrateCharacter({ id: 'one', name: 'Updated', skills: {} });
        localStorage.setItem('creation-character', JSON.stringify({ id: 'two', name: 'Other' }));
        service.saveCharacter(character, 'view-character');
        expect(JSON.parse(localStorage.getItem('creation-character')!).id).toBe('two');
        expect(JSON.parse(localStorage.getItem('character-one')!).name).toBe('Updated');
        localStorage.setItem('creation-character', JSON.stringify({ id: 'one', name: 'Old' }));
        character.name = 'Changed';
        service.saveCharacter(character, 'view-character');
        expect(JSON.parse(localStorage.getItem('creation-character')!).name).toBe('Changed');
    });
    it('captures the previous session and preserves the first snapshot while editing', () => {
        const original = JSON.stringify({ id: 'one', name: 'Before', skills: {} });
        localStorage.setItem('view-character', original);
        const character = service.readCharacter('view-character');
        character.name = 'After';
        service.saveCharacter(character, 'view-character');
        character.name = 'After again';
        service.saveCharacter(character, 'view-character');
        expect(localStorage.getItem('backup-character-one')).toBe(original);
    });
    it('detects another tab changing a character and refuses to overwrite it', () => {
        const raw = JSON.stringify({ id: 'one', name: 'Original', skills: {} });
        localStorage.setItem('character-one', raw);
        localStorage.setItem('view-character', raw);
        const character = service.readCharacter('view-character');
        localStorage.setItem('character-one', JSON.stringify({ id: 'one', name: 'Other tab' }));
        character.name = 'My edit';
        service.saveCharacter(character, 'view-character');
        expect(JSON.parse(localStorage.getItem('character-one')!).name).toBe('Other tab');
        expect(service.error).toContain('another tab');
    });
    it('reports quota failures instead of throwing or claiming a successful save', () => {
        spyOn(Storage.prototype, 'setItem').and.throwError('QuotaExceededError');
        expect(() => service.saveCharacter(hydrateCharacter({ id: 'one', name: 'Unsaved', skills: {} }), 'view-character')).not.toThrow();
        expect(service.error).toContain('could not be saved');
        expect(service.lastSaved).toBeNull();
    });
    it('includes draft-only legacy characters in installation backups without duplicating library characters', async () => {
        const saved={id:'one',name:'Library character',skills:{},legacyFlag:'keep'};
        localStorage.setItem('character-one',JSON.stringify(saved));
        localStorage.setItem('view-character',JSON.stringify(saved));
        localStorage.setItem('creation-character',JSON.stringify({id:'draft',name:'Unfinished adventure',skills:{},customField:42}));
        localStorage.setItem('creation-state','8');
        localStorage.setItem('recovery-broken','{bad');
        let downloaded: Blob | undefined;
        spyOn(URL,'createObjectURL').and.callFake(blob=>{downloaded=blob as Blob;return 'blob:test-backup';});
        spyOn(HTMLAnchorElement.prototype,'click');
        service.exportLibrary();
        const backup=JSON.parse(await downloaded!.text());
        expect(backup.characters.map((character:any)=>character.id).sort()).toEqual(['draft','one']);
        expect(backup.characters.find((character:any)=>character.id==='draft').customField).toBe(42);
        expect(backup.rawSaves['creation-state']).toBe('8');
        expect(backup.rawSaves['view-character']).toBe(JSON.stringify(saved));
        expect(backup.rawSaves['recovery-broken']).toBe('{bad');
        expect(localStorage.getItem('creation-character')).toContain('Unfinished adventure');
    });
});
