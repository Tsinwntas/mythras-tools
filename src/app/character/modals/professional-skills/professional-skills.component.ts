import { Character } from 'src/app/model/character';
import { isCustomSkill } from 'src/app/services/custom-skills';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { Skill } from 'src/app/model/skill';

@Component({
  selector: 'app-professional-skills',
  templateUrl: './professional-skills.component.html',
  styleUrls: ['./professional-skills.component.scss']
})
export class ProfessionalSkillsComponent implements ModalInnerContent {
  character?: Character;
  skills : Skill[];
  selectedSkill : (skill :Skill) => void;
  culturePage : boolean;
  careerPage: boolean;

  CULTURE_PAGE = 1;
  CAREER_PAGE = 2;

  constructor(private dialogRef: MatDialogRef<ProfessionalSkillsComponent>){}

  getHeader() : string {
    return 'Choose extra Professional Skill';
  }

  setProps(props: any): void {
    this.character = props.character;
    this.skills = props.skills;
    this.selectedSkill = props.selectedSkill;
    if(props.page){
      this.culturePage = props.page==this.CULTURE_PAGE;
      this.careerPage = props.page==this.CAREER_PAGE;
    }
  }

  getRemainingSkills() : Skill[] {
    return this.skills.filter((s : Skill)=>s.professional && (this.isSelected(s) || isCustomSkill(s) || ((this.careerPage || !s.cultureBonus) && (this.culturePage || !s.careerBonus)))).sort((a, b) => a.name.localeCompare(b.name));
  }

  isSelected(skill: Skill): boolean {
    if (!this.character) return false;
    const list = this.culturePage ? this.character.skills.extraProfessionalCultureSkills : this.careerPage ? this.character.skills.extraProfessionalCareerSkills : [this.character.skills.hobby];
    return list.some(s=>s===skill || (s && s.name===skill.name));
  }

  select(skill : Skill) {
    if (this.isSelected(skill)) return;
    this.selectedSkill(skill);
    this.dialogRef.close(); 
  }

  getCreateProps(){
    return {
      createdSkill:(skill : Skill) => {
        if(!skill.name)
          skill.name = "Unnamed Skill";
        skill.custom = true;
        this.skills.push(skill);
      }
    }
  }
  
}
