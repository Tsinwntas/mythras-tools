import { ModalInnerContent } from './../../../model/modal-inner-content';
import { Skill } from './../../../model/skill';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent implements ModalInnerContent {

  skill : Skill;
  createdSkill : (skill :Skill) => void;

  getHeader() : string {
    return 'Choose extra Professional Skill';
  }

  setProps(props: any,okFunction:{function: (props?:any)=>void,props: any}[]): void {
    this.skill = new Skill("Skill Name", true, "str", "str").setOperations({add:0, multiply:1});
    console.log(this.skill);
    this.createdSkill = props.createdSkill;
    okFunction.push({function:this.createdSkill,props:this.skill});
  }

}
