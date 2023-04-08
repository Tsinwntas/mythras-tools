import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';
import { rollMany } from 'src/app/services/common.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {

  @Input() character : Character;

  roll2(char : string) {
    (this.character.skills as any)[char] = rollMany(2,6,6);
  }

  roll3(char : string) {
    (this.character.skills as any)[char] = rollMany(3,6);
  }

  
  calculatePoints() : number {
    return 80 - [
      parseInt(this.character.skills.str as any),
      parseInt(this.character.skills.dex as any),
      parseInt(this.character.skills.con as any),
      parseInt(this.character.skills.pow as any),
      parseInt(this.character.skills.cha as any),
      parseInt(this.character.skills.int as any),
      parseInt(this.character.skills.siz as any)
    ].filter(s=>s).reduce((a,b) => a+b, 0);
  }



}
