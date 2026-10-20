import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CombatStyle } from '../model/combat-style';
import { TableComponent } from '../table-component/table.component';

@Component({
  selector: 'styles-table',
  templateUrl: './styles-table.component.html',
  styleUrls: ['./styles-table.component.scss']
})
export class StylesTableComponent extends TableComponent implements OnChanges {
  ngOnChanges(): void { this.resetTable(); }

  @Input() styles : CombatStyle[];
  @Input() singleTrait: boolean;
  @Input() browseOnly = false;
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
    // setTimeout(() => {
    if(this.singleTrait){
      this.table = this.styles.map((style : CombatStyle, index : number) => Object.assign({}, style, {select:style, remove:index}));
    } else {
      this.table = this.styles.map(style => Object.assign({select:style},style));
    }
    // }, 0);
  }

  override getColumnsDefinition(): string[] {
    if (this.browseOnly) {
      return ['name', 'culture', 'source', 'traits', 'weapons'];
    }
    let cols = ['select', 'name', 'culture', 'source', 'traits', 'weapons', 'critOffensive', 'critDefensive', 'offensive', 'defensive'];
    if(this.singleTrait){
      return cols.concat('remove')
    }
    return cols;
  }

  getWeapons(weapons : any) : any[] {
    return Object.keys(weapons || {}).map(weapon => {
      return {type: weapon, weapons: weapons[weapon]};
    })
  }

  getSpecials(specials : string) : string[] {
    return specials? specials.split(/,[ ]*/g) : [];
  }

  readonly effectFields = [
    {key:'offensive',label:'Offensive'}, {key:'defensive',label:'Defensive'},
    {key:'critOffensive',label:'Critical offensive'}, {key:'critDefensive',label:'Critical defensive'}
  ];
  getStyleEffect(style: CombatStyle, key: string): string { return (style as any)[key] || ''; }
  getCardTrait(style: CombatStyle): any { return style.traits?.find(t => t.name === style.selectedTrait?.name); }

  currentTrait : {name: string, trait: string};

  getSelectedTrait(element: any) : {name: string, trait: string} {
    return (element.traits || []).find((t:any)=>t.name==element.select?.selectedTrait?.name)
  }

}
