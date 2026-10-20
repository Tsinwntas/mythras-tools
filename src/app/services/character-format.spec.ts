import { hydrateCharacter, parseCharacterFile } from './character-format';
import { getAllocationTotal, getDamageModifier, getSkillTotal, getTotalFromItems } from './character-service.service';
describe('Legacy character compatibility', () => {
    const legacy = () => ({ id: 'legacy-2019', name: 'Anathaym', skills: { str: '11', con: '13', siz: '10', dex: '16', int: '14', pow: '7', cha: '9' }, customExtension: { campaign: 'Meeros' } });
    it('restores missing nested defaults without discarding unknown data or numeric strings', () => {
        const character = hydrateCharacter(legacy());
        expect(character.id).toBe('legacy-2019');
        expect(character.skills.str as any).toBe('11');
        expect((character as any).customExtension.campaign).toBe('Meeros');
        expect(character.equipment.head).toBeDefined();
        expect(character.magic.path.invocations).toEqual([]);
        expect(character.skills.skills.find(s => s.name === 'Athletics')).toBeDefined();
    });
    it('reconnects duplicated selected-skill references and counts each allocation once', () => {
        const skill = { name: 'Healing', professional: true, base: ['int', 'pow'], cultureBonus: 10, careerBonus: 5 };
        const character = hydrateCharacter({ ...legacy(), skills: { ...legacy().skills, skills: [skill], extraProfessionalCultureSkills: [{ ...skill }], hobby: { ...skill } } });
        expect(character.skills.extraProfessionalCultureSkills[0]).toBe(character.skills.skills[0]);
        expect(character.skills.hobby).toBe(character.skills.skills[0]);
        expect(getAllocationTotal(character, 'cultureBonus')).toBe(10);
        character.skills.extraProfessionalCultureSkills[0].cultureBonus = 15;
        expect(getSkillTotal(character, character.skills.skills[0])).toBe(41);
    });
    it('preserves unknown fields on a selected-skill copy', () => {
        const skill = {name:'Healing',professional:true,base:['int','pow'],cultureBonus:10};
        const character=hydrateCharacter({...legacy(),skills:{...legacy().skills,skills:[skill],extraProfessionalCultureSkills:[{...skill,extension:{campaignRule:null}}]}});
        const exported=JSON.parse(JSON.stringify(character));
        expect(exported.skills.extraProfessionalCultureSkills[0].extension).toEqual({campaignRule:null});
    });
    it('does not turn explicit zero overrides or empty notes into defaults', () => {
        const character = hydrateCharacter({ ...legacy(), movementRate: 0, equipment: { totalEnc: 0 }, currentValues: { pow: 0 }, extraInformation: '', nullableExtension: null });
        expect(character.movementRate).toBe(0);
        expect(character.equipment.totalEnc).toBe(0);
        expect((character as any).currentValues.pow).toBe(0);
        expect(character.extraInformation).toBe('');
        expect((character as any).nullableExtension).toBeNull();
    });
    it('preserves customized standard skill formulas and restores absent standard skills', () => {
        const character = hydrateCharacter({ ...legacy(), skills: { ...legacy().skills, skills: [{ name: 'Athletics', professional: false, base: ['str', 'dex'], add: 7, extraBonus: 9 }] } });
        const athletics = character.skills.skills.find(s => s.name === 'Athletics')!;
        expect(getSkillTotal(character, athletics)).toBe(43);
        expect(character.skills.skills.filter(s => s.name === 'Athletics').length).toBe(1);
        expect(character.skills.skills.find(s => s.name === 'Boating')).toBeDefined();
    });
    it('reads a BOM-prefixed original export and library backups', () => {
        expect(parseCharacterFile('\uFEFF' + JSON.stringify(legacy()))[0].id).toBe('legacy-2019');
        expect(parseCharacterFile(JSON.stringify({ format: 'mythras-tools-library', characters: [legacy(), { ...legacy(), id: 'second' }] })).length).toBe(2);
    });
    it('rejects unrelated JSON and malformed files', () => {
        for (const text of ['null', '42', '[]', '{}', '{"settings":true}', '{bad'])
            expect(() => parseCharacterFile(text)).toThrow();
    });
    it('round trips all custom records and unrecognized fields in the original shape', () => {
        const original = { ...legacy(), magic: { custom: [{ name: 'Starfall', description: 'A custom spell' }] }, customFactions: [{ name: 'Lanterns', rank: 'Keeper', description: 'Watch the roads' }], customNotes: [{ name: 'Quest', description: 'Find the gate' }] };
        const result = parseCharacterFile(JSON.stringify(hydrateCharacter(original)))[0];
        expect((result as any).customExtension).toEqual(original.customExtension);
        expect(result.magic.custom[0].name).toBe('Starfall');
        expect(result.customFactions).toEqual(original.customFactions);
        expect(result.customNotes).toEqual(original.customNotes);
    });
    it('calculates the rulebook example attributes with numeric-string characteristics', () => {
        const character = hydrateCharacter(legacy());
        expect(getSkillTotal(character, character.skills.ap)).toBe(3);
        expect(getSkillTotal(character, character.skills.init)).toBe(15);
        expect(getSkillTotal(character, character.skills.luck)).toBe(2);
        expect(getSkillTotal(character, character.hp.head)).toBe(5);
        expect(getSkillTotal(character, character.hp.chest)).toBe(7);
        expect(getDamageModifier(character)).toBe('0');
    });
    it('keeps unlearned professional skills at zero and respects custom training', () => {
        const character = hydrateCharacter(legacy());
        const skill = character.skills.skills.find(s => s.name === 'Folk Magic')!;
        expect(getSkillTotal(character, skill)).toBe(0);
        skill.force = true;
        expect(getSkillTotal(character, skill)).toBe(16);
        skill.extraBonus = '15' as any;
        expect(getSkillTotal(character, skill)).toBe(31);
    });
    it('uses the damage table beyond human ranges and supports custom overrides', () => {
        const character = hydrateCharacter(legacy());
        for (const [sum, damage] of [[5, '-1d8'], [10, '-1d6'], [15, '-1d4'], [20, '-1d2'], [25, '0'], [30, '+1d2'], [35, '+1d4'], [50, '+1d10'], [60, '+1d12'], [70, '+2d6'], [80, '+1d8+1d6'], [110, '+2d10'], [120, '+2d10+1d2']] as [
            number,
            string
        ][]) {
            character.skills.str = sum;
            character.skills.siz = 0;
            expect(getDamageModifier(character)).withContext('STR + SIZ ' + sum).toBe(damage);
        }
        character.damageModifierOverride = '+2d8';
        expect(getDamageModifier(character)).toBe('+2d8');
    });
    it('totals quantities and halves worn armour ENC', () => {
        const character = hydrateCharacter({ ...legacy(), equipment: { head: { enc: 4, cost: 20 }, items: [{ name: 'Rope', quantity: 3, enc: 2, cost: 5 }] } });
        expect(getTotalFromItems(character, 'enc', true)).toBe(8);
        expect(getTotalFromItems(character, 'cost')).toBe(35);
    });
});
