import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CombatStyle } from 'src/app/model/combat-style';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { StyleFilters } from 'src/app/model/style-filters';
import { CombatStylesService, getSources } from 'src/app/services/combat-styles.service';
import { AppStorageService } from 'src/app/services/app-storage.service';

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
  createStyle?: () => void;
  startCustomStyle(): void { this.createStyle?.(); this.dialogRef?.close(); }
  filtering = false;
  page = 0;
  readonly pageSize = 24;
  private visibleSource?: CombatStyle[];
  private visiblePage = -1;
  private visibleStyles: CombatStyle[] = [];
  get pageCount(): number { return Math.max(1, Math.ceil(this.getStyles().length / this.pageSize)); }
  getVisibleStyles(): CombatStyle[] {
    const all = this.getStyles();
    if (all !== this.visibleSource || this.page !== this.visiblePage) {
      this.visibleSource = all; this.visiblePage = this.page;
      this.visibleStyles = all.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
    }
    return this.visibleStyles;
  }
  changePage(delta: number): void { this.page = Math.max(0, Math.min(this.pageCount - 1, this.page + delta)); }
  @Input() browseOnly = false;
  constructor(
    @Optional() private dialogRef: MatDialogRef<AllCombatStylesComponent>,
    private styleService: CombatStylesService,
    private ref: ChangeDetectorRef,
    private storage: AppStorageService
  ) {
  }

  ngOnInit(): void {
    const storedFilters = this.storage.getRaw('style-filters');
    if(storedFilters && !this.browseOnly)
      this.filters = Object.assign(new StyleFilters(), JSON.parse(storedFilters));
    if(!this.browseOnly && (!this.filters.sources || this.filters.sources.length === 0))
      this.filters.sources = getSources();
    if(this.culture)
      this.filters.culture = this.culture;
    this.persistFilters();
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

  filter(open? : any){
    this.page = 0;
    this.styles = this.getFilteredStyles();
    this.persistFilters();
    this.ref.markForCheck();
  }

  resetFilters(): void {
    this.filters = new StyleFilters();
    if (this.culture) {
      this.filters.culture = this.culture;
    }
    this.filter();
  }

  styleSelected(style: CombatStyle) {
    if (this.browseOnly || !this.selectStyle) return;
    this.selectStyle(style);
    this.dialogRef?.close(style);
  }

  getHeader(): string {
    return "All Combat Styles";
  }
  getSources(): string {
    return "Combat Style Encyclopedia";
  }
  setProps(props: any): void {
    props = props || {};
    this.browseOnly = !!props.browseOnly;
    this.selectStyle = props.selectStyle;
    this.createStyle = props.createStyle;
    if(props.culture){
      this.culture = props.culture;
      this.filters.culture = props.culture;
    }
    this.styles = undefined as any;
  }

  private persistFilters(): void {
    if (this.browseOnly) return;
    const filters = JSON.stringify(this.filters);
    if (filters !== this.storage.getRaw('style-filters')) {
      this.storage.setRaw('style-filters', filters);
    }
  }
}
