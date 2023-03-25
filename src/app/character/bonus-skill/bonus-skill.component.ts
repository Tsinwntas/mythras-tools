import { Component } from '@angular/core';
import { Character } from 'src/app/model/character';
import { CombatStyle } from 'src/app/model/combat-style';
import { Skill } from 'src/app/model/skill';

@Component({
  selector: 'app-bonus-skill',
  templateUrl: './bonus-skill.component.html',
  styleUrls: ['./bonus-skill.component.scss']
})
export class BonusSkillComponent {

  character : Character;

  getCombatStyleProps(){
    return {
      culture: this.character.culture,
      selectStyle: (style : CombatStyle)=>{
        this.character.skills.hobby = style; 
      }
    }
  }

  getProfessionalProps(){
    return {
      skills : this.character.skills.skills,
      selectedSkill:(skill : Skill) => {
        this.character.skills.hobby = skill;
      }
    }
  }

}
