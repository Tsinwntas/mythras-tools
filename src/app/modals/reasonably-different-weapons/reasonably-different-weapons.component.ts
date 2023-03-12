import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reasonably-different-weapons',
  templateUrl: './reasonably-different-weapons.component.html',
  styleUrls: ['./reasonably-different-weapons.component.scss']
})
export class ReasonablyDifferentWeaponsComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using Reasonably Different Weapons";
  }

}
