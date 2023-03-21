import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CombatStyle } from 'src/app/model/combat-style';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { StyleFilters } from 'src/app/model/style-filters';
import { CombatStylesService } from 'src/app/services/combat-styles.service';
import { StylesTableComponent } from 'src/app/styles-table/styles-table.component';

@Component({
  selector: 'app-all-combat-styles',
  templateUrl: './all-combat-styles.component.html',
  styleUrls: ['./all-combat-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllCombatStylesComponent implements ModalInnerContent, OnInit {
  culture : string;
  styles : CombatStyle[];
  filters : StyleFilters = new StyleFilters();
  selectStyle : (style : CombatStyle) => void;
  constructor(private dialogRef: MatDialogRef<AllCombatStylesComponent>, private styleService: CombatStylesService, private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if(localStorage['style-filters'])
      this.filters = Object.assign(new StyleFilters(),JSON.parse(localStorage['style-filters']));
    if(this.culture)
      this.filters.culture = this.culture;
  }

  ngDoCheck() {
    let filters = JSON.stringify(this.filters);
    if(filters != localStorage.getItem('style-filters')) {
      localStorage.setItem('style-filters', filters);
    }
  }

  getStyles(): CombatStyle[] {
    if(!this.styles)
      this.styles = this.getFilteredStyles();
    return this.styles;
  }

  getFilteredStyles(): CombatStyle[] {
    return this.styleService.getStyles().filter(style => {
      let weaponsString = style.weapons? JSON.stringify(style.weapons) : '';
      let styleString = JSON.stringify(style);
      if(!this.filters.sources || this.filters.sources.length == 0)
        return false;
      return (!this.filters.name || style.name.toLowerCase().includes(this.filters.name.toLowerCase()) || 
      (style.traits && style.traits.filter(t=>t).map(t=>t.name).join(" ").toLowerCase().includes(this.filters.name.toLowerCase())))
      && (!this.filters.culture || (style.culture.toLowerCase()+"ic").includes(this.filters.culture.toLowerCase()))
      && (!this.filters.sources || !this.filters.sources.length || this.filters.sources.filter(source => style.source && style.source.includes(source)).length > 0)
      && (!this.filters.weapons || !this.filters.weapons.length || this.filters.weapons.filter(weapon => weaponsString.includes(weapon)).length > 0)
      && (!this.filters.specials ||!this.filters.specials.length || this.filters.specials.filter(special => styleString.includes(special)).length == this.filters.specials.length)
    });
  }

  @ViewChild('stylesTable')
  private tableComponent!: StylesTableComponent;

  filter(open? : any){
    this.styles = this.getFilteredStyles();
    this.tableComponent.resetTable();
    this.ref.detectChanges();
  }

  styleSelected(style: CombatStyle) {
    this.selectStyle(style);
    this.dialogRef.close(style);
  }

  getHeader(): string {
    return "All Combat Styles";
  }
  getSources(): string {
    return "Combat Style Encyclopedia";
  }
  setProps(props: any): void {
    this.selectStyle = props.selectStyle;
    if(props.culture)
      this.culture = props.culture;
  }
}
