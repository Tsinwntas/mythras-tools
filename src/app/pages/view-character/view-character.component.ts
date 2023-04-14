import { Component, OnInit } from '@angular/core';
import { CharacterPreviewComponent } from 'src/app/character/character-preview/character-preview.component';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-view-character',
  templateUrl: '../../character/character-preview/character-preview.component.html',
  styleUrls: ['../../character/character-preview/character-preview.component.scss']
})
export class ViewCharacterComponent extends CharacterPreviewComponent implements OnInit{

  override character : Character;

  ngOnInit(): void {
    this.load = true;
    this.hideDisclaimer = true;
    this.character = Object.assign(new Character(), JSON.parse(localStorage['view-character']));
  }

  ngDoCheck() {
    localStorage['view-character'] = JSON.stringify(this.character);
    if (this.character.id)
      localStorage['character-' + this.character.id] = JSON.stringify(
        this.character
      );
  }

}
