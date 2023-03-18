import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-height-weight',
  templateUrl: './height-weight.component.html',
  styleUrls: ['./height-weight.component.scss']
})
export class HeightWeightComponent {

  @Input() character : Character;

}
