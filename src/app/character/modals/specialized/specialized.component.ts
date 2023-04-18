import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/model/character';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { Skill } from 'src/app/model/skill';
import { TableComponent } from 'src/app/table-component/table.component';

@Component({
  selector: 'app-specialized',
  templateUrl: './specialized.component.html',
  styleUrls: ['./specialized.component.scss']
})
export class SpecializedComponent extends TableComponent implements ModalInnerContent {

  character: Character;
  skill : Skill;
  selectSkill : (skill:Skill) => void;
  table : any;

  constructor(private dialogRef: MatDialogRef<SpecializedComponent>) { 
    super();
  }


  getHeader() : string {
    if(!this.skill)
      return "Specialized Skill";
    return "Specialized: " + this.skill.name;
  }

  setProps(props: any): void {
    this.character = props.character;
    this.skill = props.skill;
    this.selectSkill = props.selectSkill;
    this.initTable();
  }

  initTable() {
    let specializations = this.character!.skills.specialized!.filter(s => s.name.startsWith(this.skill.name))!;
    this.table = specializations.map(s=> {
      let data = {
        select : s,
        specialty : s.name.replace(/[^(]+[(]/g,"").replace(/[)].*/g,""),
        culture : s.cultureBonus,
        career : s.careerBonus,
        extra : s.extraBonus
      };
      if(specializations.length > 1)
        (data as any)['remove'] = s;
      return data;
    });
  }

  override getTable(): any[] {
    if(!this.table)
      return [];
    return this.table;
  }

  setName(skill: Skill, name: any) {
    skill.name = this.skill.name.replace(/[(].*$/g,"")+" ("+name+")";
  }

  select(skill: Skill) {
    this.selectSkill(skill);
    this.dialogRef.close(skill);
  }

  add(){
    this.character.skills.specialized!.push(new Skill(this.skill.name+" (EDIT)", true).setBase(this.skill.base).setOperations({add:this.skill.add, multiply: this.skill.multiply, divide: this.skill.divide}));
    this.initTable();
  }

  remove(skill: Skill) {
    this.character.skills.specialized!.splice(this.character.skills.specialized.indexOf(skill), 1);
    this.initTable();
  }
}
