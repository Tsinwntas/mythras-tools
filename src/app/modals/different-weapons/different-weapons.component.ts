import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-different-weapons',
  templateUrl: './different-weapons.component.html',
  styleUrls: ['./different-weapons.component.scss']
})
export class DifferentWeaponsComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using Different Weapons";
  }


}
