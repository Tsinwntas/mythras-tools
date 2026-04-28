import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CharacterPreviewComponent } from 'src/app/character/character-preview/character-preview.component';
import { Character } from 'src/app/model/character';
import {
  AppStorageService,
  DebouncedSaveHandle,
} from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-view-character',
  templateUrl: '../../character/character-preview/character-preview.component.html',
  styleUrls: ['../../character/character-preview/character-preview.component.scss']
})
export class ViewCharacterComponent extends CharacterPreviewComponent implements OnInit{
  private readonly storage = inject(AppStorageService);
  private saveHandle!: DebouncedSaveHandle;

  override character : Character;

  ngOnInit(): void {
    this.saveHandle = this.storage.createDebouncedSave(
      () => this.persistCharacter(),
      300
    );
    this.load = true;
    this.hideDisclaimer = true;
    this.character = Object.assign(
      new Character(),
      JSON.parse(this.storage.getRaw('view-character')!)
    );
  }

  @HostListener('document:input')
  @HostListener('document:change')
  @HostListener('document:click')
  onUserInteraction(): void {
    if (this.saveHandle) {
      this.saveHandle.schedule();
    }
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    if (this.saveHandle) {
      this.saveHandle.flush();
    }
  }

  @HostListener('window:pagehide')
  onPageHide(): void {
    if (this.saveHandle) {
      this.saveHandle.flush();
    }
  }

  ngOnDestroy(): void {
    if (this.saveHandle) {
      this.saveHandle.flush();
      this.saveHandle.destroy();
    }
  }

  private persistCharacter(): void {
    this.storage.setJson('view-character', this.character);
    if (this.character.id) {
      this.storage.setJson(
        this.storage.getCharacterKey(this.character.id),
        this.character
      );
    }
  }

}
