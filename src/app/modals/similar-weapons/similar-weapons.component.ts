import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-similar-weapons',
  templateUrl: './similar-weapons.component.html',
  styleUrls: ['./similar-weapons.component.scss']
})
export class SimilarWeaponsComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using Similar Weapons";
  }

}
