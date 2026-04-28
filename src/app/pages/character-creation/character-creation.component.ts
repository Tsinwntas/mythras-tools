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
  HostListener,
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
import {
  AppStorageService,
  DebouncedSaveHandle,
} from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.scss'],
})
export class CharacterCreationComponent extends StatePageComponent {
  character: Character;
  private saveHandle: DebouncedSaveHandle;

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
            this.flushSave();
            this.storage.copyRaw(
              this.storage.getCharacterKey(this.character.id),
              'view-character'
            );
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
    private router: Router,
    private storage: AppStorageService
  ) {
    super(resolverLocal);
    this.saveHandle = this.storage.createDebouncedSave(
      () => this.persistCharacterState(),
      300
    );
  }

  override ngOnInit() {
    this.pageState = this.storage.getNumber('creation-state') ?? 0;
    this.character = this.storage.getRaw('creation-character')
      ? Object.assign(
          new Character(),
          JSON.parse(this.storage.getRaw('creation-character')!)
        )
      : new Character();
    this.character.skills = Object.assign(
      new Character().skills,
      this.character.skills
    );
  }

  override onStepChange(event: any): void {
    super.onStepChange(event);
    this.requestSave();
  }

  override stepTo(index: any, click?: () => void): void {
    super.stepTo(index, click);
    this.requestSave();
  }

  @HostListener('document:input')
  @HostListener('document:change')
  @HostListener('document:click')
  onUserInteraction(): void {
    this.requestSave();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.flushSave();
  }

  @HostListener('window:pagehide')
  onPageHide(): void {
    this.flushSave();
  }

  ngOnDestroy(): void {
    this.flushSave();
    this.saveHandle.destroy();
  }

  private requestSave(): void {
    this.saveHandle.schedule();
  }

  private flushSave(): void {
    this.saveHandle.flush();
  }

  private persistCharacterState(): void {
    this.storage.setRaw('creation-state', this.pageState ?? 0);
    this.storage.setJson('creation-character', this.character);
    if (this.character.id) {
      this.storage.setJson(
        this.storage.getCharacterKey(this.character.id),
        this.character
      );
    }
  }

  override setProps(component: ComponentRef<any>): void {
    component.instance.character = this.character;
  }
}
