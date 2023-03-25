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

  constructor(private dialogRef: MatDialogRef<ProfessionalSkillsComponent>){}

  getHeader() : string {
    return 'Choose extra Professional Skill';
  }

  setProps(props: any): void {
    this.skills = props.skills;
    this.selectedSkill = props.selectedSkill;
  }

  getRemainingSkills() : Skill[] {
    return this.skills.filter((s : Skill)=>s.professional && !s.cultureBonus && !s.careerBonus).sort((a, b) => a.name.localeCompare(b.name));
  }

  select(skill : Skill) {
    this.selectedSkill(skill);
    this.dialogRef.close(); 
  }
  
}
