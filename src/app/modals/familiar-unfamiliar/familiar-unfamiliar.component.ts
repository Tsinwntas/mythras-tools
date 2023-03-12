import { WeaponsNotCoveredComponent } from './../weapons-not-covered/weapons-not-covered.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-familiar-unfamiliar',
  templateUrl: './familiar-unfamiliar.component.html',
  styleUrls: ['./familiar-unfamiliar.component.scss']
})
export class FamiliarUnfamiliarComponent extends WeaponsNotCoveredComponent {
  
  override getHeader(): string {
    return "Using a Familiar Weapon in conjuction with a Unfamiliar Weapon";
  }

}
