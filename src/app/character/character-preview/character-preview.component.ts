import { Character } from 'src/app/model/character';
import { Component } from '@angular/core';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent {
  character : Character;
}
