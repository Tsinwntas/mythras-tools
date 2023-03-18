import { Component } from '@angular/core';
import { TableComponent } from 'src/app/table-component/table.component';

@Component({
  selector: 'size-table',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./size-table.component.scss']
})
export class SizeTableComponent extends TableComponent {
  override getTable(): any[] {
    return [
      getRow("Height (cm)", {add:150, mul:5}),
      getRow("Lithe (kg)", {add:35, mul:5}),
      getRow("Medium (kg)", {add:49, mul:7}),
      getRow("Heavy (kg)", {add:63, mul:9})      
    ]
  }

  override getColumnsDefinition(): string[] {
    let cols = super.getColumnsDefinition();
    return [cols[cols.length-1]].concat(cols.slice(0, cols.length-2));
  }
}

function getRow(header: string, ops: any): any{
  let row = {SIZ: header};
  for(let i = 1; i<=12; i++){
    let bound = (i*ops.mul) + ops.add;
    (row as any)[i+7]=(bound-ops.mul+1)+"-"+(bound);
  }
  return row;
}
