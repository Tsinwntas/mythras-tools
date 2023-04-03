import { Character } from 'src/app/model/character';
import { Component } from '@angular/core';

@Component({
  selector: 'app-background-details',
  templateUrl: './background-details.component.html',
  styleUrls: ['./background-details.component.scss']
})
export class BackgroundDetailsComponent {
  character : Character;
}
