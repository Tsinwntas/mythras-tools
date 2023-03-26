import { Character } from 'src/app/model/character';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starting-magic',
  templateUrl: './starting-magic.component.html',
  styleUrls: ['./starting-magic.component.scss'],
})
export class StartingMagicComponent implements OnInit {
  character: Character;
  ngOnInit(): void {
    if(!this.character.magic.folk)
    {
      this.character.magic.folk = [];
    }
    if(!this.character.magic.miracles)
    {
      this.character.magic.miracles = [];
    }
    if(!this.character.magic.sorcery)
    {
      this.character.magic.sorcery = [];
    }
    if(!this.character.magic.paths)
    {
      this.character.magic.paths = [];
    }
  }
}
