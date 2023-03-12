import { TableComponent } from 'src/app/table-component/table.component';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-success-levels',
  templateUrl: './success-levels.component.html',
  styleUrls: ['./success-levels.component.scss']
})
export class SuccessLevelsComponent extends TableComponent implements ModalInnerContent {

  skill : number = 100;
  augment: number = 0;
  opponent: number = 0;

  getHeader(): string {
    return "Success Table";
  }

  override getTable() : any[] {
    return [
      {level: "Normal Skill", mod:1, suc:true, crit:true, fail:true, fumble: true},
      {level: "Very Easy", mod:2, suc:true, crit:true, fail:true, fumble: true},
      {level: "Easy", mod:1.5, suc:true, crit:true, fail:true, fumble: true},
      {level: "Hard", mod:0.6666666666666, suc:true, crit:true, fail:true, fumble: true},
      {level: "Formidalble", mod:0.5, suc:true, crit:true, fail:true, fumble: true},
      {level: "Herculean", mod:0.1, suc:true, crit:true, fail:true, fumble: true},
      {level: "Hopeless", mod:0, suc:true, crit:true, fail:true, fumble: true},
    ]
  }

  override getColumnsDefinition(): string[] {
    return ['level', 'normal', 'suc', 'crit', 'fail', 'fumble'];
  }

  getValue(skipAug? : boolean) : number {
    return (this.skill == undefined ? 100 : this.skill) - (!this.opponent ? 0 : Math.max(0,this.opponent-100)) + (skipAug || !this.augment ? 0 : this.augment*0.2);
  }

  getNormalValue(mod : number) : number {
    return Math.ceil((this.skill == undefined ? 100 : this.skill)*mod);
  }

  getCrit(mod : number) : number {
    let val = Math.ceil(this.getValue(true)*mod/10);
    if(val == 0)
      return 0;
    return Math.max(val,1);
  }

  getSuccess(mod : number) : number {
    let val = Math.ceil(this.getValue()*mod);
    if(val == 0)
      return 0;
    return Math.min(Math.max(val,5),95);
  }

  getFumble(mod : number) : number {
    let val = Math.ceil(this.getValue()*mod);
    if(val > 100)
      return 100;
    return 99;
  }

  getFailure(mod : number) : number {
    return this.getSuccess(mod)+1;
  }

}
