import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';
import { rollMany } from 'src/app/services/common.service';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.scss']
})
export class AgeComponent {

  @Input() character : Character;

  roll(amount : number, mod : number) {
    this.character.age = rollMany(amount, 6, mod);
  }


}
