import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';
import { TableComponent } from 'src/app/table-component/table.component';

@Component({
  selector: 'app-difficulty-grades',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./difficulty-grades.component.scss']
})
export class DifficultyGradesComponent extends TableComponent implements ModalInnerContent {
    
  getHeader(): string {
    return "Difficulty Grades";
  }
  getSources?(): string {
    return "Mythras Core Rules 38"
  }

  override getTable(): any[] {
    return [
      {difficultyGrade:'Very Easy', skillModifier:'Double'},
      {difficultyGrade:'Easy', skillModifier:'Add Half'},
      {difficultyGrade:'Standard', skillModifier:'None'},
      {difficultyGrade:'Hard', skillModifier:'Reduce by 1/3'},
      {difficultyGrade:'Formidable', skillModifier:'Reduce by Half'},
      {difficultyGrade:'Herculean', skillModifier:'Reduce to 1/10'},
      {difficultyGrade:'Hopeless', skillModifier:'No attempt can be made'},
    ]
  }


}
