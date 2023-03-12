import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-substantially-different-weapon',
  templateUrl: './substantially-different-weapon.component.html',
  styleUrls: ['./substantially-different-weapon.component.scss']
})
export class SubstantiallyDifferentWeaponComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using Substantially Different Weapons";
  }

}
