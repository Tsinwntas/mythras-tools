import { Component, DoCheck } from '@angular/core';
import { getColumnHeader } from '../services/table.service';

@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements DoCheck {
  tableData: any[] = [];
  columnDefinitions: string[] = [];
  highlightedColumns: string[] = [];
  columnHeaderMap: Record<string, string> = {};

  ngDoCheck(): void {
    this.refreshViewData();
  }

  private refreshViewData(): void {
    const tableData = this.getTable() || [];
    this.tableData = tableData;

    const columnDefinitions = this.getColumnsDefinition();
    if (!this.arraysEqual(columnDefinitions, this.columnDefinitions)) {
      this.columnDefinitions = columnDefinitions;
      this.columnHeaderMap = {};
      for (const col of this.columnDefinitions) {
        this.columnHeaderMap[col] = this.getColumnHeader(col);
      }
    }

    this.highlightedColumns = this.getHighlightedColumns();
  }

  private arraysEqual<T>(a: T[], b: T[]): boolean {
    if (a === b) {
      return true;
    }
    if (!a || !b || a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  getTable() : any[] {
    return []
  }

  getColumnsDefinition() : string []{
    let table = this.getTable();
    if(!table || !table.length)
      return [];
    return Object.keys(table[0]);
  }

  getColumnHeader(col : string) : string {
    return getColumnHeader(col, this.getEmptyColumns());

  }

  getEmptyColumns() : string[] {
    return [];
  }

  getHighlightedColumns() : string[] {
    return [];
  }
}
