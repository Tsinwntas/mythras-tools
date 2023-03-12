import { SpecialEffectsComponent } from './../modals/special-effects/special-effects.component';
import { EncPenaltyComponent } from './../modals/enc-penalty/enc-penalty.component';
import { SituationalModifiersComponent } from './../modals/situational-modifiers/situational-modifiers.component';
import { AugmentModalComponent } from './../modals/augment-modal/augment-modal.component';
import { InfoModalComponent } from './../modals/info-modal/info-modal.component';
import { FatigueComponent } from './../modals/fatigue/fatigue.component';
import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalHandlerService {

  constructor(public dialog: MatDialog) { }

  encModal(enc : number){
    this.open(EncPenaltyComponent, {enc: enc});
  }

  specialEffects(effect: string) {
    this.open(SpecialEffectsComponent, {effect: effect})
  }

  open(component : any, props? : any) {
    let data = {component: component, props : props}; 
    const dialogRef = this.dialog.open(InfoModalComponent, 
      {
        data: data,
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
