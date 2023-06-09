import { CharacterPreviewComponent } from './../../character/character-preview/character-preview.component';
import { BackgroundDetailsComponent } from './../../character/background-details/background-details.component';
import { EquipmentComponent } from './../../character/equipment/equipment.component';
import { StartingMagicComponent } from './../../character/starting-magic/starting-magic.component';
import { CultComponent } from './../../character/cult/cult.component';
import { AgeExperienceComponent } from './../../character/age-experience/age-experience.component';
import { FamilyComponent } from './../../character/family/family.component';
import { PassionsComponent } from './../../character/passions/passions.component';
import { SocialClassComponent } from './../../character/social-class/social-class.component';
import { BackgroundEventsComponent } from './../../character/background-events/background-events.component';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { AgeComponent } from 'src/app/character/age/age.component';
import { ConceptComponent } from 'src/app/character/concept/concept.component';
import { CultureComponent } from 'src/app/character/culture/culture.component';
import { DetailsComponent } from 'src/app/character/details/details.component';
import { HeightWeightComponent } from 'src/app/character/height-weight/height-weight.component';
import { SkillsComponent } from 'src/app/character/skills/skills.component';
import { StatsComponent } from 'src/app/character/stats/stats.component';
import { Character } from 'src/app/model/character';
import { CombatState } from 'src/app/model/combat-state';
import { StatePageComponent } from '../state-page/state-page.component';
import { CareerComponent } from 'src/app/character/career/career.component';
import { BonusSkillComponent } from 'src/app/character/bonus-skill/bonus-skill.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
})
export class CharacterCreationComponent extends StatePageComponent {
  character: Character;

  override states: CombatState[] = [
    { stepLabel: 'Details', component: DetailsComponent },
    { stepLabel: 'Concept', component: ConceptComponent },
    { stepLabel: 'Characteristics', component: SkillsComponent },
    { stepLabel: 'Base Attributes', component: StatsComponent },
    { stepLabel: 'Height and Weight', component: HeightWeightComponent },
    { stepLabel: 'Age', component: AgeComponent },
    { stepLabel: 'Culture', component: CultureComponent },
    { stepLabel: 'Background Events', component: BackgroundEventsComponent },
    { stepLabel: 'Passions', component: PassionsComponent },
    { stepLabel: 'Money & Social Class', component: SocialClassComponent },
    { stepLabel: 'Family & Connections', component: FamilyComponent },
    { stepLabel: 'Career', component: CareerComponent },
    { stepLabel: 'Hobby', component: BonusSkillComponent },
    { stepLabel: 'Experience through Age', component: AgeExperienceComponent },
    { stepLabel: 'Cults & Brotherhoods', component: CultComponent },
    { stepLabel: 'Starting Magic', component: StartingMagicComponent },
    { stepLabel: 'Starting Equipment', component: EquipmentComponent },
    {
      stepLabel: 'Background Story',
      component: BackgroundDetailsComponent,
      next: [
        {
          target: -1,
          label: 'Preview',
          click: () => {
            localStorage['view-character'] =
              localStorage['character-' + this.character.id];
            this.router.navigate(['/view']);
          },
        },
      ],
      back: true
    },
    // { stepLabel: "Preview", component: CharacterPreviewComponent},
  ];

  constructor(
    private resolverLocal: ComponentFactoryResolver,
    private router: Router
  ) {
    super(resolverLocal);
  }

  override ngOnInit() {
    this.pageState = localStorage['creation-state']
      ? localStorage['creation-state']
      : 0;
    this.character = localStorage['creation-character']
      ? Object.assign(
          new Character(),
          JSON.parse(localStorage['creation-character'])
        )
      : new Character();
    this.character.skills = Object.assign(
      new Character().skills,
      this.character.skills
    );
  }

  override ngDoCheck() {
    localStorage['creation-state'] = this.pageState;
    localStorage['creation-character'] = JSON.stringify(this.character);
    if (this.character.id)
      localStorage['character-' + this.character.id] = JSON.stringify(
        this.character
      );
  }

  override setProps(component: ComponentRef<any>): void {
    component.instance.character = this.character;
  }
}
