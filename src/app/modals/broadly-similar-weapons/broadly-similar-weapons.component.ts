import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-broadly-similar-weapons',
  templateUrl: './broadly-similar-weapons.component.html',
  styleUrls: ['./broadly-similar-weapons.component.scss']
})
export class BroadlySimilarWeaponsComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using Broadly Similar Weapons";
  }

}
