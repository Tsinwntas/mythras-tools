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
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ComponentRef,
  HostListener,
  ViewChild,
  ViewContainerRef,
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
export class CharacterCreationComponent
  extends StatePageComponent
  implements AfterViewInit
{
  character: Character;
  sidebarOpen = false;
  private saveHandle: DebouncedSaveHandle;
  @ViewChild('activeStateHost', { read: ViewContainerRef })
  private activeStateHost?: ViewContainerRef;
  private sectionComponents = new Map<number, ComponentRef<any>>();
  private activeSectionIndex = -1;

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
            this.router.navigate(['/view/responsive']);
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
    this.syncSidebarForViewport();
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

  override ngAfterViewInit(): void {
    this.renderActiveState();
  }

  override onStepChange(event: any): void {
    this.pageState = event.selectedIndex;
    this.renderActiveState();
    this.requestSave();
  }

  override stepTo(index: any, click?: () => void): void {
    if (index >= 0) {
      this.pageState = index;
      this.renderActiveState();
    }
    if (click) {
      click();
    }
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

  @HostListener('window:resize')
  onResize(): void {
    this.syncSidebarForViewport();
  }

  ngOnDestroy(): void {
    this.flushSave();
    this.saveHandle.destroy();
    this.sectionComponents.forEach((componentRef) => componentRef.destroy());
    this.sectionComponents.clear();
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

  toggleSidebar(): void {
    if (window.innerWidth > 600) {
      return;
    }
    this.sidebarOpen = !this.sidebarOpen;
  }

  goToStep(index: number): void {
    this.stepTo(index);
    if (window.innerWidth <= 959) {
      this.sidebarOpen = false;
    }
  }

  nextStep(): void {
    const next = Math.min(this.states.length - 1, (this.pageState ?? 0) + 1);
    this.stepTo(next);
  }

  previousStep(): void {
    const previous = Math.max(0, (this.pageState ?? 0) - 1);
    this.stepTo(previous);
  }

  getCurrentState(): CombatState {
    return this.states[this.pageState ?? 0];
  }

  private renderActiveState(): void {
    if (!this.activeStateHost) {
      return;
    }
    const targetIndex = this.pageState ?? 0;
    const state = this.states[targetIndex];
    if (!state?.component) {
      return;
    }
    if (this.activeSectionIndex === targetIndex) {
      return;
    }
    const componentFactory = this.resolverLocal.resolveComponentFactory(
      state.component as any
    );
    if (this.activeStateHost.length > 0) {
      this.activeStateHost.detach(0);
    }
    let componentRef = this.sectionComponents.get(targetIndex);
    const hostView = componentRef?.hostView as EmbeddedViewRef<unknown> | undefined;
    if (componentRef && hostView?.destroyed) {
      this.sectionComponents.delete(targetIndex);
      componentRef = undefined;
    }
    if (!componentRef) {
      componentRef = this.activeStateHost.createComponent(componentFactory);
      this.setProps(componentRef);
      this.sectionComponents.set(targetIndex, componentRef);
    } else {
      this.activeStateHost.insert(
        (componentRef.hostView as EmbeddedViewRef<unknown>)
      );
    }
    this.activeSectionIndex = targetIndex;
  }

  private syncSidebarForViewport(): void {
    if (window.innerWidth <= 600) {
      this.sidebarOpen = false;
    }
  }
}
