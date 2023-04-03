import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'age-band',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./age-band.component.scss']
})
export class AgeBandComponent extends TableComponent{

  override getTable(): any[] {
    return [
      {'Age Band' : 'Early Middle Age (40-49 for humans)', 'Endurance and Willpower Roll Grade': 'Easy'},
      {'Age Band' : 'Middle Age (50-59 for humans)', 'Endurance and Willpower Roll Grade': 'Standard'},
      {'Age Band' : 'Late Middle Age (60-69 for humans)', 'Endurance and Willpower Roll Grade': 'Hard'},
      {'Age Band' : 'Old Age (70-79 for humans)', 'Endurance and Willpower Roll Grade': 'Formidable'},
      {'Age Band' : 'Advanced Old Age (80-89 for humans)', 'Endurance and Willpower Roll Grade': 'Herculean'},
      {'Age Band' : 'Dotage (90+ for humans)', 'Endurance and Willpower Roll Grade': 'Hopeless'},
    ]
  }

}
