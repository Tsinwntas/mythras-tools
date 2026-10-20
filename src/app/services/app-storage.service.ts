import { Injectable } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { Character } from '../model/character';
import { hydrateCharacter, downloadJson } from './character-format';

export type AppStorageStaticKey =
  | 'attack-type'
  | 'combat-state-gm'
  | 'combat-state-player'
  | 'creation-character'
  | 'creation-state'
  | 'initiative'
  | 'style-filters'
  | 'user-type'
  | 'round'
  | 'view-character';

export interface DebouncedSaveHandle {
  schedule: () => void;
  flush: () => void;
  destroy: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  error = '';
  lastSaved: Date | null = null;
  private observedCharacters = new Map<string, string | null>();
  private get storage(): Storage { return localStorage; }

  getRaw(key: AppStorageStaticKey | string): string | null {
    try { return this.storage.getItem(key); }
    catch { this.error = 'Browser storage is unavailable. Download a JSON backup to keep your changes.'; return null; }
  }

  setRaw(key: AppStorageStaticKey | string, value: string | number): void {
    try {
      const next = String(value);
      if (this.storage.getItem(key) !== next) {
        this.storage.setItem(key, next);
        this.lastSaved = new Date();
      }
      this.error = '';
    } catch { this.error = 'Changes could not be saved in this browser. Download a JSON backup now.'; }
  }

  remove(key: AppStorageStaticKey | string): void {
    this.storage.removeItem(key);
  }

  copyRaw(from: AppStorageStaticKey | string, to: AppStorageStaticKey | string): void {
    const value = this.getRaw(from);
    if (value === null) {
      this.remove(to);
      return;
    }
    this.setRaw(to, value);
  }

  getJson<T>(key: AppStorageStaticKey | string): T | null {
    const value = this.getRaw(key);
    if (value === null) {
      return null;
    }
    try { return JSON.parse(value) as T; }
    catch { this.error = 'A browser save could not be read. The original data has been kept.'; return null; }
  }

  setJson(key: AppStorageStaticKey | string, value: unknown): void {
    this.setRaw(key, JSON.stringify(value));
  }

  getNumber(key: AppStorageStaticKey | string): number | null {
    const value = this.getRaw(key);
    if (value === null) {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  getCharacterKey(id: string | number): string {
    return `character-${id}`;
  }

  readCharacter(key: string): Character {
    const raw = this.getRaw(key);
    if (raw === null) return hydrateCharacter(new Character());
    try {
      const character = hydrateCharacter(JSON.parse(raw));
      this.observedCharacters.set(character.id, this.getRaw(this.getCharacterKey(character.id)));
      this.setRaw('backup-' + this.getCharacterKey(character.id), raw);
      return character;
    }
    catch {
      // Never silently overwrite an unreadable save with a blank character.
      this.setRaw('recovery-' + key, raw);
      this.error = 'An unreadable save was kept in recovery. A new draft has been opened.';
      return new Character();
    }
  }

  listCharacters(): Character[] {
    const characters: Character[] = [];
    try {
      Object.keys(this.storage).filter(k => k.startsWith('character-')).forEach(key => {
        try { characters.push(hydrateCharacter(JSON.parse(this.getRaw(key)!))); }
        catch { this.error = 'Some saved characters could not be read. Export a library backup to preserve their original data.'; }
      });
    } catch { this.error = 'Browser storage is unavailable.'; }
    return characters;
  }

  saveCharacter(character: Character, activeKey?: 'creation-character' | 'view-character'): void {
    const key = this.getCharacterKey(character.id);
    const old = this.getRaw(key);
    if (this.observedCharacters.has(character.id) && this.observedCharacters.get(character.id) !== old) {
      this.error = 'This character changed in another tab. Download your changes as JSON, then reopen the character to use the latest saved version.';
      return;
    }
    const next = JSON.stringify(character);
    if (old && old !== next && !this.getRaw('backup-' + key)) this.setRaw('backup-' + key, old);
    this.setRaw(key, next);
    if (this.error) return;
    this.observedCharacters.set(character.id, next);
    if (activeKey) this.setRaw(activeKey, next);
    if (this.error) return;
    const otherKey = activeKey === 'view-character' ? 'creation-character' : 'view-character';
    const other = this.getJson<Character>(otherKey);
    if (other?.id === character.id) this.setRaw(otherKey, next);
  }

  exportLibrary(): void {
    const characters = this.listCharacters();
    const rawSaves: Record<string, string> = {};
    // Older versions could leave a character only in the active draft/view slot.
    for (const key of ['creation-character','view-character']) {
      const raw=this.getRaw(key);
      if (!raw) continue;
      try {
        const character=hydrateCharacter(JSON.parse(raw));
        if (!characters.some(saved=>saved.id===character.id)) characters.push(character);
      } catch { /* Keep the unreadable original in rawSaves as well. */ }
    }
    Object.keys(this.storage).filter(k => /^(character-|backup-character-|recovery-)/.test(k) || ['creation-character','view-character','creation-state'].includes(k))
      .forEach(k => rawSaves[k] = this.getRaw(k)!);
    downloadJson({ format: 'mythras-tools-library', version: 1, exportedAt: new Date().toISOString(), characters, rawSaves }, 'mythras-library.json');
  }

  createDebouncedSave(action: () => void, delayMs = 250): DebouncedSaveHandle {
    const trigger$ = new Subject<void>();
    const subscription: Subscription = trigger$
      .pipe(debounceTime(delayMs))
      .subscribe(() => action());

    return {
      schedule: () => trigger$.next(),
      flush: () => action(),
      destroy: () => {
        subscription.unsubscribe();
        trigger$.complete();
      },
    };
  }
}
