import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { StyleFilters } from '../model/style-filters';
import { getSources } from '../services/combat-styles.service';
import { getSpecialEffects } from '../services/special-effects.service';
import { getWeaponCategories } from '../services/weapon.service';

@Component({
  selector: 'style-filters',
  templateUrl: './style-filters.component.html',
  styleUrls: ['./style-filters.component.scss']
})
export class StyleFiltersComponent {
  @Input() filters: StyleFilters;
  @Output() filter = new EventEmitter<any>();

  weaponGroups : { name : string, weapons : string[] }[];
  specialGroups: { name : string, specials : string[] }[];
  sources : string[];
  weaponFilter : string = '';
  specialFilter : string = '';
  sourceFilter : string = '';

  constructor() {

  }

  getSources() : string[] {
    if(!this.sources)
      this.sources = getSources();
    return this.sources;
  }

  clearSources(){
    this.filters.sources = [];
    this.filter.emit(this.filters);
  }

  getWeaponGroups() : { name : string, weapons : string[] }[] {
    if(!this.weaponGroups){
      this.initWeaponGroups();
    }
    return this.weaponGroups;
  }

  initWeaponGroups() {
    let groups = getWeaponCategories();
    this.weaponGroups = Object.keys(groups).map(key => {
      return {name : key, weapons : groups[key]};
    });
  }

  clearWeapons(){
    this.filters.weapons = [];
    this.filter.emit(this.filters);
  }

  getSpecialGroups() : { name : string, specials : string[] }[] {
    if(!this.specialGroups){
      this.specialGroups = [
        {name:"Offensive", specials:getSpecialEffects(true).map(s=>s.effect)},
        {name:"Defensive", specials:getSpecialEffects(false).map(s=>s.effect)}
      ];
    }
    return this.specialGroups;
  }

  clearSpecials(){
    this.filters.specials = [];
    this.filter.emit(this.filters);
  }

  isHidden(filter: string, option: string) : boolean {
    return option.toLowerCase().indexOf(filter.toLowerCase()) == -1
  }
}
