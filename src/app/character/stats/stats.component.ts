import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';
import { Skill } from 'src/app/model/skill';
import { getDamageModifier, getSkillBase } from 'src/app/services/character-service.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

  @Input() public character: Character;
  
  getSkills(prof : boolean) : Skill[] {
    return this.character.skills.skills.filter(skill => skill.professional == prof);
  }

   getHPLocations() : Skill[] {
    return ['head','leftArm','chest','rightArm','abdoment','leftLeg','rightLeg'].map(k=>(this.character.hp as any)[k]);
  }

  getCalculatedCharacteristics() : Skill[] {
    return [
      this.character.skills.ap,
      this.character.skills.damage,
      this.character.skills.expMod,
      this.character.skills.healing,
      this.character.skills.init,
      this.character.skills.luck,
    ];
  }

  getBaseCharacteristic(skill : Skill) : string {
    if(skill.name == 'Damage Modifier')
      return getDamageModifier(this.character);
    return this.getBaseSkill(skill).toString();
  }

  public getStandardSkills() : Skill[] {
    return this.getSkills(false);
  }

  public getProfessionalSkills() : Skill[] {
    return this.getSkills(true);
  }

  getBaseSkill(skill : Skill) : number {
    return getSkillBase(this.character, skill);
  }

}
