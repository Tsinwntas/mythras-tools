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
  public readonly storage = inject(AppStorageService);
  private saveHandle!: DebouncedSaveHandle;

  override character : Character;

  ngOnInit(): void {
    this.saveHandle = this.storage.createDebouncedSave(
      () => this.persistCharacter(),
      300
    );
    this.load = true;
    this.hideDisclaimer = true;
    this.character = this.storage.readCharacter('view-character');
  }

  @HostListener('document:input')
  @HostListener('document:click')
  @HostListener('document:change')
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
    this.storage.saveCharacter(this.character, 'view-character');
  }

}
