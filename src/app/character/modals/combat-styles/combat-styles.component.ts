import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/model/character';
import { CombatStyle } from 'src/app/model/combat-style';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { CombatStylesService } from 'src/app/services/combat-styles.service';
import { StylesTableComponent } from 'src/app/styles-table/styles-table.component';

@Component({
  selector: 'app-combat-styles',
  templateUrl: './combat-styles.component.html',
  styleUrls: ['./combat-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CombatStylesComponent implements ModalInnerContent {

  character : Character;
  selectStyle : (style:CombatStyle) => void;

  constructor(private combatStyles : CombatStylesService, private dialogRef: MatDialogRef<CombatStylesComponent>, private ref: ChangeDetectorRef) {
  }

  getHeader() : string {
    return 'Combat Styles'+(this.character.culture? ": "+this.character.culture: '');
  }

  setProps(props: any): void {
    this.character = props.character;
    if(!this.character.skills.combatstyles)
      this.character.skills.combatstyles = [];
    this.selectStyle = props.selectStyle;
  }

  select(style: CombatStyle) {
    this.selectStyle(style);
    this.dialogRef.close(style);
  }

  remove(index : any) {
    this.character.skills.combatstyles.splice(index, 1);
    this.ref.detectChanges();
    setTimeout(()=>{
      this.tableComponent.resetTable();
      this.ref.detectChanges();
    },0);

  }

  getProps() : any {
    return {
      culture:this.character.culture,
      selectStyle : (style : CombatStyle)=>{
        let newStyle = Object.assign({}, style);
        delete (newStyle as any)['select'];
        delete (newStyle as any)['remove'];
        if(!newStyle.selectedTrait)
          newStyle.selectedTrait = newStyle.traits[0];
        this.character.skills.combatstyles.push(newStyle);
        this.ref.detectChanges();
        setTimeout(()=>{
          if(this.character.skills.combatstyles.length > 1)
            this.tableComponent.resetTable();
          this.ref.detectChanges();
      },0);
      }
    }
  }

  setSelectedTrait(props:{trait : any, index: number}) {
    this.character.skills.combatstyles[props.index].selectedTrait = props.trait.value;
  }

  getStyles() : CombatStyle[] {
    let styles : CombatStyle[]= [];
    this.character.skills.combatstyles.forEach(style => {
      styles.push(new CombatStyle(style.name, style));
    });
    return styles;
  }

  @ViewChild(('characterstyles'))
  private tableComponent!: StylesTableComponent;


}
