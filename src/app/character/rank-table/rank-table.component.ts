import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'rank-table',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./rank-table.component.scss']
})
export class RankTableComponent extends TableComponent{
  override getTable(): any[] {
    return [
      {rank:"Common",	theistCult:"Lay Member", animistCult:"Follower", sorceryOrder:"Novice", mysticalOrder:"Aspirant", brotherhood:"Associate"},
      {rank:"Dedicated",	theistCult:"Initiate", animistCult:"Spirit Worshipper", sorceryOrder:"Apprentice", mysticalOrder:"Student", brotherhood:"Apprentice"},
      {rank:"Proven",	theistCult:"Acolyte", animistCult:"Shaman",	sorceryOrder:"Adept", mysticalOrder:"Disciple", brotherhood:"Journeyman"},
      {rank:"Overseer",	theistCult:"Priest", animistCult:"High Shaman", sorceryOrder:"Mage", mysticalOrder:"Master", brotherhood:"Master"},
      {rank:"Leader",	theistCult:"High Priest", animistCult:"Spirit Lord", sorceryOrder:"Arch Mage", mysticalOrder:"Sage", brotherhood:"Grand Master"}

    ]
  }
}
