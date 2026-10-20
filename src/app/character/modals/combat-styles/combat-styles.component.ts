import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/model/character';
import { CombatStyle } from 'src/app/model/combat-style';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';

@Component({selector:'app-combat-styles',templateUrl:'./combat-styles.component.html',styleUrls:['./combat-styles.component.scss'],changeDetection:ChangeDetectionStrategy.OnPush})
export class CombatStylesComponent implements ModalInnerContent {
  character: Character;
  selectStyle: (style: CombatStyle) => void;
  creatingCustom = false;
  customStyle: CombatStyle;
  customError = '';
  constructor(private dialogRef: MatDialogRef<CombatStylesComponent>, private ref: ChangeDetectorRef) {}
  getHeader(): string { return 'Combat Styles' + (this.character.culture ? ': ' + this.character.culture : ''); }
  setProps(props: any): void { this.character=props.character; this.character.skills.combatstyles ||= []; this.selectStyle=props.selectStyle; }
  select(style: CombatStyle): void { this.selectStyle(style); this.dialogRef.close(style); }
  remove(index: number): void { this.character.skills.combatstyles.splice(index,1); this.character.skills.combatstyles=[...this.character.skills.combatstyles]; this.selectStyle(undefined as any); }
  startCustom(): void {
    this.customStyle = new CombatStyle('', {source:'Custom',culture:this.character.culture,weapons:{Melee:'',Ranged:'',Shields:''},traits:[],selectedTrait:{name:'',trait:''}});
    this.customStyle.force=true; this.creatingCustom=true; this.customError=''; this.ref.markForCheck();
  }
  saveCustom(): void {
    if (!this.customStyle.name.trim()) { this.customError='Enter a name for your combat style.'; return; }
    this.customStyle.name=this.customStyle.name.trim();
    if(this.customStyle.selectedTrait.name || this.customStyle.selectedTrait.trait) this.customStyle.traits=[{...this.customStyle.selectedTrait}];
    this.character.skills.combatstyles.push(this.customStyle);
    this.select(this.customStyle);
  }
  getProps(): any {
    return {culture:this.character.culture,createStyle:()=>this.startCustom(),selectStyle:(style:CombatStyle)=>{
      const added=new CombatStyle(style.name,style);
      if(!added.selectedTrait) added.selectedTrait=added.traits[0] ? {...added.traits[0]} : {name:'',trait:''};
      this.character.skills.combatstyles=[...this.character.skills.combatstyles,added]; this.ref.markForCheck();
    }};
  }
  setSelectedTrait(props: {trait:any;index:number}): void { this.character.skills.combatstyles[props.index].selectedTrait={...props.trait.value}; }
}
