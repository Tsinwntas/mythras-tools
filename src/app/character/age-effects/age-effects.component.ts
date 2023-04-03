import { TableComponent } from 'src/app/table-component/table.component';
import { Component } from '@angular/core';

@Component({
  selector: 'age-effects',
  templateUrl: '../../table-component/table.component.html',
  styleUrls: ['./age-effects.component.scss']
})
export class AgeEffectsComponent extends TableComponent {

  override getTable(): any[] {
    return [
      {"1d6": "1-2", "Physical Aging (Failed Endurance)": "STR", "Mental Aging (Failed Willpower)":"INT"},
      {"1d6": "3-4", "Physical Aging (Failed Endurance)": "CON", "Mental Aging (Failed Willpower)":"POW"},
      {"1d6": "5-6", "Physical Aging (Failed Endurance)": "DEX", "Mental Aging (Failed Willpower)":"CHA"},
    ]
  }
}
