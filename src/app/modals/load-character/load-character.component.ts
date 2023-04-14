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

  loadNew(){
    let character = new Character();
    localStorage['view-character'] = JSON.stringify(character);
    this.router.navigate(['/view']);
    this.dialogRef.close("Loaded " + character.id);
  }

  remove(index: number) {
    if (confirm('Are you sure you want to delete "' + this.characters[index].name+'"?')) {
      let toRemove = this.characters.splice(index, 1)[0];
      if (toRemove && toRemove.id)
        localStorage.removeItem('character-' + toRemove.id);
    }
  }

  upload(event : any){
    let reader = new FileReader();
    try{
    reader.readAsText(event.target.files[0]);
    } catch(e){
      //ignore
      return;
    }
    reader.onload = async () => {
      const dataString = reader.result;
      if (!dataString){
        console.log("No Data in file");
        return;
      }
      try{
      let character = JSON.parse(dataString.toString());
      if(!character.id)
        character.id = uuidv4();
      if(!localStorage['character-' + character.id] || confirm("This character already exists. Are you sure you want to overwrite?")){
        localStorage['character-' + character.id] = JSON.stringify(character);
        this.ngOnInit();
      }

      }catch(e){
        console.error("Failed to upload character.")
      }
    }
  }
}
