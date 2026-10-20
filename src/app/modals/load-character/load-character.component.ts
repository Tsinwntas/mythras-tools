import { AppStorageService } from '../../services/app-storage.service';
import { parseCharacterFile } from '../../services/character-format';
import { Router } from '@angular/router';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/model/character';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-load-character',
  templateUrl: './load-character.component.html',
  styleUrls: ['./load-character.component.scss'],
})
export class LoadCharacterComponent implements ModalInnerContent, OnInit {
  message = '';
  action: string;
  characters: Character[];

  constructor(public storage: AppStorageService, private router: Router, private dialogRef: MatDialogRef<LoadCharacterComponent>) {}

  ngOnInit() {
    this.characters = this.storage.listCharacters();
  }

  getHeader(): string {
    return (this.action == 'pdf' ? 'View' : 'Load') + ' Character';
  }

  setProps(prop: any) {
    this.action = prop.action;
  }

  edit(index: number, value: string) {
    let character = this.characters[index];
    character.name = value;
    this.storage.saveCharacter(character);
  }

  load(id: string) {
    switch (this.action) {
      case 'pdf': {
        localStorage['view-character'] = localStorage['character-' + id];
        this.router.navigate(['/view/responsive']);
        break;
      }
      case 'creation': {
        localStorage['creation-character'] = localStorage['character-' + id];
        this.router.navigate(['/character-creation']);
        break;
      }
    }
    this.dialogRef.close("Loaded " + id);
  }

  loadNew(){
    let character = new Character();
    localStorage['view-character'] = JSON.stringify(character);
    this.router.navigate(['/view/responsive']);
    this.dialogRef.close("Loaded " + character.id);
  }

  remove(index: number) {
    if (confirm('Are you sure you want to delete "' + this.characters[index].name+'"?')) {
      let toRemove = this.characters.splice(index, 1)[0];
      if (toRemove && toRemove.id)
        localStorage.removeItem('character-' + toRemove.id);
    }
  }

  async upload(event: Event): Promise<void> {
    const input=event.target as HTMLInputElement; const file=input.files?.[0]; if(!file) return;
    try {
      const characters=parseCharacterFile(await file.text());
      for(const character of characters) {
        if(this.storage.getRaw('character-'+character.id)) { character.id=uuidv4(); character.name=(character.name || 'Character')+' (imported)'; }
        this.storage.saveCharacter(character);
        if(this.storage.error) throw new Error(this.storage.error);
      }
      this.ngOnInit(); this.message=characters.length+' character(s) imported.';
    } catch(error) { this.message=error instanceof Error ? error.message : 'Could not import this file.'; }
    input.value='';
  }
}
