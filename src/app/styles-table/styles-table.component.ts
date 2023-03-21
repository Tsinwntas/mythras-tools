import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CombatStyle } from '../model/combat-style';
import { TableComponent } from '../table-component/table.component';

@Component({
  selector: 'styles-table',
  templateUrl: './styles-table.component.html',
  styleUrls: ['./styles-table.component.scss']
})
export class StylesTableComponent extends TableComponent {

  @Input() styles : CombatStyle[];
  @Input() singleTrait: boolean;
  @Output() select = new EventEmitter<CombatStyle>();
  @Output() remove = new EventEmitter<number>();
  @Output() setSelectedTrait = new EventEmitter<any>();
  
  table: any[];

  override getTable(): any[] {
    if(!this.table){
      this.resetTable();
    }
    return this.table;
  }

  resetTable() {
    if(this.singleTrait){
      this.table = this.styles.map((style : CombatStyle, index : number) => Object.assign(style, {select:style, remove:index}));
    } else {
      this.table = this.styles.map(style => Object.assign({select:style},style));
    }
  }

  override getColumnsDefinition(): string[] {
    let cols = ['select', 'name', 'culture', 'source', 'traits', 'weapons', 'critOffensive', 'critDefensive', 'offensive', 'defensive'];
    if(this.singleTrait){
      return cols.concat('remove')
    }
    return cols;
  }

  getWeapons(weapons : any) : any[] {
    return Object.keys(weapons).map(weapon => { 
      return {type: weapon, weapons: weapons[weapon]};
    })
  }

  getSpecials(specials : string) : string[] {
    return specials? specials.split(/,[ ]*/g) : [];
  }

  currentTrait : {name: string, trait: string};

  getSelectedTrait(element: any) : {name: string, trait: string} {
    if(this.currentTrait)
      return this.currentTrait;
    return element.traits.find((t:any)=>t.name==element.select.selectedTrait.name)
  }

}
