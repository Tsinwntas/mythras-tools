import { Passions } from './../../services/passions.service';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'passions-table',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./passions-table.component.scss'],
})
export class PassionsTableComponent extends TableComponent {
  override getTable(): any[] {
    return Passions;
  }
}
