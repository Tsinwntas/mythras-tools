import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'distance-penalties',
  templateUrl: '../table-component/table.component.html',
  styleUrls: ['./distance-penalties.component.scss']
})
export class DistancePenaltiesComponent extends TableComponent {
  
  override getTable(): any[] {
    return [
      {distance: '1-20m', size0: '1 Step Harder', size11: 'No Effect', size21: '1 Step Easier', size41: '1 Step Easier', size81: '2 Steps Easier', size151: '2 Steps Easier'},
      {distance: '21-20m', size0: '1 Step Harder', size11: '1 Step Harder', size21: 'No Effect', size41: '1 Step Easier', size81: '1 Steps Easier', size151: '2 Steps Easier'},
      {distance: '41-20m', size0: '2 Step Harder', size11: '1 Step Harder', size21: '1 Step Harder', size41: 'No Effect', size81: '1 Steps Easier', size151: '1 Steps Easier'},
      {distance: '61-20m', size0: '2 Step Harder', size11: '2 Step Harder', size21: '1 Step Harder', size41: '1 Step Harder', size81: 'No Effect', size151: '1 Steps Easier'},
      {distance: '81-20m', size0: '3 Step Harder', size11: '2 Step Harder', size21: '2 Step Harder', size41: '1 Step Harder', size81: '1 Steps Harder', size151: 'No Effect'},
      {distance: '101-20m', size0: '3 Step Harder', size11: '3 Step Harder', size21: '2 Step Harder', size41: '2 Step Harder', size81: '1 Steps Harder', size151: '1 Steps Harder'},
      {distance: '121-20m', size0: '4 Step Harder', size11: '3 Step Harder', size21: '3 Step Harder', size41: '2 Step Harder', size81: '2 Steps Harder', size151: '1 Steps Harder'},
      {distance: 'Each 20m', size0: 'Follow table progression', size11: '', size21: '', size41: '', size81: '', size151: ''},
    ]  
  }

  override getColumnHeader(col : string) : string {
    switch(col){
      case 'distance' : return "Distance";
      case 'size0' : return "Size <= 10";
      case 'size11' : return "11-20";
      case 'size21' : return "21-40";
      case 'size41' : return "41-80";
      case 'size81' : return "81-150";
      case 'size151' : return "151-300";
    }
    return "";

  }

}
