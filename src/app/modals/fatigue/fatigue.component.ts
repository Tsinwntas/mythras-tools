import { TableComponent } from '../../table-component/table.component';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { InfoModalComponent } from './../info-modal/info-modal.component';
import { Component } from '@angular/core';
import { getColumnHeader } from 'src/app/services/table.service';

@Component({
  selector: 'app-fatigue',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./fatigue.component.scss']
})
export class FatigueComponent extends TableComponent implements ModalInnerContent{

  public getHeader(): string {
    return "Fatigue Chart";
  }
  public getSources(): string {
    return "Mythras Core Rules 79"
  }

  override getTable(){
    return [
      {level:"Fresh", skillGrade: "", movement: "", initiative: "No Penalties", actionPoints: "", recoveryPeriod: ""},
      {level:"Winded", skillGrade: "Hard", movement: "No Penalty", initiative: "No Penalty", actionPoints: "No Penalty", recoveryPeriod: "15 minutes"},
      {level:"Tired", skillGrade: "Hard", movement: "-1 metre", initiative: "No Penalty", actionPoints: "No Penalty", recoveryPeriod: "3 hours"},
      {level:"Wearied", skillGrade: "Formidable", movement: "-2 metres", initiative: "-2", actionPoints: "No Penalty", recoveryPeriod: "6 hours"},
      {level:"Exhausted", skillGrade: "Formidable", movement: "Halved", initiative: "-4", actionPoints: "-1", recoveryPeriod: "12 hours"},
      {level:"Debilitated", skillGrade: "Herculean", movement: "Halved", initiative: "-6", actionPoints: "-2", recoveryPeriod: "18 hours"},
      {level:"Incapacitated", skillGrade: "Herculean", movement: "Immobile", initiative: "-8", actionPoints: "-3", recoveryPeriod: "24 hours"},
      {level:"Semi-Conscious", skillGrade: "Hopeless", movement: "No Activities Possible", initiative: "No Activities Possible", actionPoints: "No Activities Possible", recoveryPeriod: "36 hours"},
      {level:"Comatose", skillGrade: "No Activities Possible", movement: "No Activities Possible", initiative: "No Activities Possible", actionPoints: "No Activities Possible", recoveryPeriod: "48 hours"},
      {level:"Dead", skillGrade: "", movement: "", initiative: "", actionPoints: "", recoveryPeriod: "Never"},
    ]
  }

  override getColumnsDefinition() : string []{
    return ['level', 'skillGrade', 'movement', 'initiative', 'actionPoints', 'recoveryPeriod'];
  }

  override getEmptyColumns(): string[] {
    return ['level'];
  }

  

}
