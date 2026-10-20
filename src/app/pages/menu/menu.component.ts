import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorageService } from '../../services/app-storage.service';
import { Character } from '../../model/character';
import { downloadJson, parseCharacterFile } from '../../services/character-format';
import { v4 as uuidv4 } from 'uuid';
import { AppInstallService } from '../../services/app-install.service';
@Component({ standalone: true, imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule], selector: 'app-menu', templateUrl: './menu.component.html', styleUrls: ['./menu.component.scss'] })
export class MenuComponent {
    characters: Character[] = [];
    search = '';
    message = '';
    constructor(private router: Router, public storage: AppStorageService, public install: AppInstallService) { this.refresh(); }
    refresh(): void { this.characters = this.storage.listCharacters(); }
    get filteredCharacters(): Character[] { const q = this.search.trim().toLowerCase(); return this.characters.filter(c => [c.name, c.player, c.career, c.culture].join(' ').toLowerCase().includes(q)); }
    isAlreadyCreatingCharacter(): boolean { return !!this.storage.getJson('creation-character'); }
    newChararcter(): void {
        if (this.isAlreadyCreatingCharacter())
            this.storage.saveCharacter(this.storage.readCharacter('creation-character'));
        this.storage.remove('creation-character');
        this.storage.remove('creation-state');
        this.router.navigate(['/character-creation']);
    }
    open(character: Character, edit = false): void {
        this.storage.setJson(edit ? 'creation-character' : 'view-character', character);
        if (edit)
            this.storage.setRaw('creation-state', 0);
        this.router.navigate([edit ? '/character-creation' : '/view/responsive']);
    }
    download(character: Character): void { downloadJson(character, (character.name || 'character') + '.json'); }
    duplicate(character: Character): void { const copy = JSON.parse(JSON.stringify(character)); copy.id = uuidv4(); copy.name = (copy.name || 'Unnamed character') + ' (copy)'; this.storage.saveCharacter(copy); this.refresh(); this.message = 'Character duplicated.'; }
    canRestore(character: Character): boolean { return !!this.storage.getRaw('backup-character-' + character.id); }
    restore(character: Character): void {
        const key = 'character-' + character.id;
        const previous = this.storage.getRaw('backup-' + key);
        if (!previous)
            return;
        const current = this.storage.getRaw(key)!;
        this.storage.setRaw(key, previous);
        this.storage.setRaw('backup-' + key, current);
        // Restore active copies too, so a stale draft cannot overwrite the recovered version.
        for (const active of ['creation-character', 'view-character'])
            if (this.storage.getJson<Character>(active)?.id === character.id)
                this.storage.setRaw(active, previous);
        this.refresh();
        this.message = 'Previous session restored. Restore again to undo.';
    }
    remove(character: Character): void {
        if (!confirm('Delete ' + (character.name || 'this character') + ' from the library? Download a backup first if you need it.'))
            return;
        this.storage.remove('character-' + character.id);
        this.storage.remove('backup-character-' + character.id);
        for (const key of ['creation-character', 'view-character'])
            if (this.storage.getJson<Character>(key)?.id === character.id)
                this.storage.remove(key);
        this.refresh();
        this.message = 'Character deleted.';
    }
    async upload(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file)
            return;
        try {
            const characters = parseCharacterFile(await file.text());
            for (const character of characters) {
                if (this.storage.getRaw('character-' + character.id)) {
                    character.id = uuidv4();
                    character.name = (character.name || 'Unnamed character') + ' (imported)';
                }
                this.storage.saveCharacter(character);
                if (this.storage.error)
                    throw new Error(this.storage.error);
            }
            this.refresh();
            this.message = characters.length + ' character(s) imported. Existing characters were kept.';
        }
        catch (error) {
            this.message = error instanceof SyntaxError ? 'This file is not valid JSON. Choose an exported character or library backup.' : error instanceof Error ? error.message : 'Could not import this file.';
        }
        input.value = '';
    }
}
