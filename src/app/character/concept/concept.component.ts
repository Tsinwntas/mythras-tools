import { Component, Input } from '@angular/core';
import { Character } from 'src/app/model/character';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent {

  concepts : string [] =
  [  'Fierce',
    'Young, naïve',
    'Bad-tempered',
    'Chivalrous',
    'Suspicious',
    'Overly-curious',
    'Unscrupulous',
    'Disgraced',
    'Overconfident',
    'Mischievous',
    'Respectable',
    'Ambitious',
    'Cautious',
    'Unrefined',
    'Witty',
    'Hunter',
    'Gemstone',
    'Miner',
    'Champion',
    'Shaman',
    'Explorer',
    'Scholar',
    'Mercenary',
    'Thief',
    'Forester',
    'Hunter',
    'Boatman',
    'Opportunist',
    'Apothecary'
  ]

  @Input() character : Character;


}
