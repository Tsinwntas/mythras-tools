import { Router } from '@angular/router';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/model/character';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-load-character',
  templateUrl: './load-character.component.html',
  styleUrls: ['./load-character.component.scss'],
})
export class LoadCharacterComponent implements ModalInnerContent, OnInit {
  action: string;
  characters: Character[];

  constructor(private router: Router, private dialogRef: MatDialogRef<LoadCharacterComponent>) {}

  ngOnInit() {
    this.characters = [];
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('character-'))
        this.characters.push(Object.assign(new Character(), JSON.parse(localStorage[k])));
    });
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
    localStorage['character-' + character.id] = JSON.stringify(character);
  }

  load(id: string) {
    switch (this.action) {
      case 'pdf': {
        localStorage['view-character'] = localStorage['character-' + id];
        this.router.navigate(['/view']);
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

  remove(index: number) {
    if (confirm('Are you sure you want to delete "' + this.characters[index].name+'"?')) {
      let toRemove = this.characters.splice(index, 1)[0];
      if (toRemove && toRemove.id)
        localStorage.removeItem('character-' + toRemove.id);
    }
  }
}
