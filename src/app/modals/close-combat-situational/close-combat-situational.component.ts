import { ModalInnerContent } from './../../model/modal-inner-content';
import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-close-combat-situational',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./close-combat-situational.component.scss']
})
export class CloseCombatSituationalComponent extends TableComponent implements ModalInnerContent {
  getHeader(): string {
    return "Close Combat Situational Modifiers";
  }
  getSources(): string {
    return "Mythras Core Rules 101";
  }
  override getTable(): any[] {
    return [
      {situation:'Attacking a helpless target', difficultyGrade:'Automatic'},
      {situation:'Attacking in a confined situation', difficultyGrade:'Hard'},
      {situation:'Defending while on lower ground or against mounted foe.', difficultyGrade:'Hard'},
      {situation:'Fighting while on unstable ground.', difficultyGrade:'Hard'},
      {situation:'Fighting whilst crouching or from one knee', difficultyGrade:'Hard'},
      {situation:'Fighting in poor visibility (thig fog, snowstorm)', difficultyGrade:'Hard'},
      {situation:'Defending against an attack from behind', difficultyGrade:'Formidable'},
      {situation:'Fighting while prone', difficultyGrade:'Formidable'},
      {situation:'Fighting in partial darkness (dim illumination)', difficultyGrade:'Formidable'},
      {situation:'Fighting in pitch black conditions (no illimination at all)', difficultyGrade:'Herculean'},
      {situation:'Blinded or loss of primary perceptive sense', difficultyGrade:'Herculean'},
    ]
  }
}
