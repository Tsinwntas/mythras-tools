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
    this.skills = props.skills;
    this.selectedSkill = props.selectedSkill;
    if(props.page){
      this.culturePage = props.page==this.CULTURE_PAGE;
      this.careerPage = props.page==this.CAREER_PAGE;
    }
  }

  getRemainingSkills() : Skill[] {
    return this.skills.filter((s : Skill)=>s.professional && (this.careerPage || !s.cultureBonus) && (this.culturePage || !s.careerBonus)).sort((a, b) => a.name.localeCompare(b.name));
  }

  select(skill : Skill) {
    this.selectedSkill(skill);
    this.dialogRef.close(); 
  }

  getCreateProps(){
    return {
      createdSkill:(skill : Skill) => {
        if(!skill.name)
          skill.name = "Unnamed Skill";
        this.skills.push(skill);
      }
    }
  }
  
}
