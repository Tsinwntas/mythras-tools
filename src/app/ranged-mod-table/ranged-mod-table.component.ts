import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ranged-mod-table',
  templateUrl: '../table-component/table.component.html',
  styleUrls: ['./ranged-mod-table.component.scss']
})
export class RangedModTableComponent extends TableComponent{
  override getTable(): any[] {
    return [
      {situation:'Light Wind*', difficultyGrade:'Hard'},
      {situation:'Moderate Wind*', difficultyGrade:'Formidable'},
      {situation:'Strong Wind*', difficultyGrade:'Herculean'},
      {situation:'Gale, Storm or Worse*', difficultyGrade:'Hopeless'},
      {situation:'Target is Running', difficultyGrade:'Hard'},
      {situation:'Target is Sprinting', difficultyGrade:'Formidable'},
      {situation:'Target obscured by mist or is in partial darkness', difficultyGrade:'Hard'},
      {situation:'Target obscured by thick smoke, fog or is in darkness', difficultyGrade:'Formidable'},
      {situation:'Target is completely obscured', difficultyGrade:'Herculean'},
      {situation:'Blinded or loss of primary perceptive sense', difficultyGrade:'Hopeless'},
      {situation:'Target prone', difficultyGrade:'Formidable'},
      {situation:'Attacker is prone**', difficultyGrade:'Herculean'},
      {situation:'Attacker is on unstable ground', difficultyGrade:'Hard'}
    ]
  }
}
