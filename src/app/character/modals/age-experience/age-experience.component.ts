import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { Component } from '@angular/core';
import { TableComponent } from 'src/app/table-component/table.component';

@Component({
  selector: 'modal-age-experience',
  templateUrl: '../../../table-component/table.component.html',
  styleUrls: ['./age-experience.component.scss']
})
export class AgeExperienceModalComponent extends TableComponent implements ModalInnerContent{

  table :any[];

  getHeader() : string {
    return "Age-Experience Table";
  }

  getSources(): string {
    return "Mythras Core Rules 34";
  }

  setProps(props: any): void {
    this.table=props.table;
  }

  override getTable(): any[] {
    if(!this.table)
      return [];
    return this.table;
  }

}
