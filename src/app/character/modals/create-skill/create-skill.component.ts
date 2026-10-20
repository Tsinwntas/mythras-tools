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
  editing = false;
  createdSkill : (skill :Skill) => void;

  getHeader() : string {
    return this.editing ? 'Edit custom skill' : 'Create professional skill';
  }

  setProps(props: any,okFunction:{function: (props?:any)=>void,props: any}[]): void {
    this.editing = !!props.skill;
    this.skill = props.skill ? Object.assign(new Skill('',true), props.skill, {base:[...props.skill.base]}) : new Skill('',true,'str','str').setOperations({multiply:1});
    this.skill.custom = true;
    this.skill.force = true;
    this.createdSkill = props.createdSkill;
    okFunction.push({function:this.createdSkill,props:this.skill});
  }

}
