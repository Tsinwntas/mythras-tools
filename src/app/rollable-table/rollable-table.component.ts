import { BackgroundEventsService } from './../services/background-events.service';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'rollable-table',
  templateUrl: '../table-component/table.component.html',
  styleUrls: ['./rollable-table.component.scss'],
})
export class RollableTableComponent extends TableComponent {
  @Input() columnHeaders: string[];
  @Input() table: any[];

  constructor(private backgroundEventsService: BackgroundEventsService) {
    super();
  }

  override getTable(): any[] {
    return this.table;
  }

  override getColumnHeader(col: string): string {
    if (!this.columnHeaders) {
      return super.getColumnHeader(col);
    }
    switch (col) {
      case 'range':
        return this.columnHeaders[0];
      case 'text':
        return this.columnHeaders[1];
    }
    return super.getColumnHeader(col);
  }
}
