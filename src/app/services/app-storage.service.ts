import { Injectable } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

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
  private readonly storage = localStorage;

  getRaw(key: AppStorageStaticKey | string): string | null {
    return this.storage.getItem(key);
  }

  setRaw(key: AppStorageStaticKey | string, value: string | number): void {
    this.storage.setItem(key, String(value));
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
    return JSON.parse(value) as T;
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
