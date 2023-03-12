import { Component } from '@angular/core';
import { getColumnHeader } from '../services/table.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  getTable() : any[] {
    return []
  }

  getColumnsDefinition() : string []{
    return Object.keys(this.getTable()[0]);
  }

  getColumnHeader(col : string) : string {
    return getColumnHeader(col, this.getEmptyColumns());

  }

  getEmptyColumns() : string[] {
    return [];
  }
}
