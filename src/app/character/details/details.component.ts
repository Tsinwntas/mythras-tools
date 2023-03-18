import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  @Input() character : Character;

}
