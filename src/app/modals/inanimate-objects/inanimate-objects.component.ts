import { ModalInnerContent } from './../../model/modal-inner-content';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inanimate-objects',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./inanimate-objects.component.scss']
})
export class InanimateObjectsComponent extends TableComponent implements ModalInnerContent {
  getHeader(): string {
    return "Inanimate Objects Armour and Hit Points";
  }
  getSources(): string {
    return "Mythras Core Rules 81";
  }
  override getTable(): any[] {
    return [
      {object: "Boulder", armorPoints:10, hitPoints:40},
      {object: "Castle Gate", armorPoints:8, hitPoints:120},
      {object: "Castle Wall", armorPoints:10, hitPoints:250},
      {object: "Chain/Shackle", armorPoints:8, hitPoints:8},
      {object: "Club", armorPoints:4, hitPoints:4},
      {object: "Dagger", armorPoints:6, hitPoints:4},
      {object: "Hut Wall (2m section)", armorPoints:3, hitPoints:15},
      {object: "Iron Door", armorPoints:12, hitPoints:75},
      {object: "Rope", armorPoints:6, hitPoints:3},
      {object: "War sword", armorPoints:6, hitPoints:10},
      {object: "Wooden Chair", armorPoints:2, hitPoints:6},
      {object: "Wooden Door (normal)", armorPoints:4, hitPoints:25},
      {object: "Wooden Door (normal)", armorPoints:6, hitPoints:30},
      {object: "Wooden Door (normal)", armorPoints:4, hitPoints:5},
    ]
  }
}
