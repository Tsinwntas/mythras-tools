import { ModalInnerContent } from './../../model/modal-inner-content';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hit-locations',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./hit-locations.component.scss']
})
export class HitLocationsComponent extends TableComponent implements ModalInnerContent {
  getHeader(): string {
    return "Human Hit Locations";
  }
  getSources(): string {
    return "Mythras Core Rules 109";
  }
  override getTable(): any[] {
    return [
      {"1d20":"1-3", hitLocation:"Right Leg"},
      {"1d20":"4-6", hitLocation:"Left Leg"},
      {"1d20":"7-9", hitLocation:"Absoment"},
      {"1d20":"10-12", hitLocation:"Chest"},
      {"1d20":"13-15", hitLocation:"Right Leg"},
      {"1d20":"16-18", hitLocation:"Left Arm"},
      {"1d20":"19-20", hitLocation:"Right Head"}
    ]
  }
}
