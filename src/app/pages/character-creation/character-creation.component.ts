import { CustomizationComponent } from 'src/app/character/customization/customization.component';
import { downloadJson } from 'src/app/services/character-format';
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
  customizationReturnStep: number | null = null;
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
    { stepLabel: 'Customization', component: CustomizationComponent },
    {
      stepLabel: 'Background Story',
      component: BackgroundDetailsComponent,
      next: [
        {
          target: -1,
          label: 'Preview',
          click: () => {
            this.preview();
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
    public storage: AppStorageService
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
    this.character = this.storage.readCharacter('creation-character');
    this.pageState = Math.max(0, Math.min(this.states.length - 1, this.pageState ?? 0));
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
  @HostListener('document:click')
  @HostListener('document:change')
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

  public flushSave(): void {
    this.saveHandle.flush();
  }

  private persistCharacterState(): void {
    this.storage.setRaw('creation-state', this.pageState ?? 0);
    this.storage.saveCharacter(this.character, 'creation-character');
  }

  override setProps(component: ComponentRef<any>): void {
    component.instance.character = this.character;
  }

  get allowanceKey(): string | null {
    return ({Characteristics:'characteristics', Culture:'culture', Career:'career', 'Experience through Age':'bonus'} as Record<string,string>)[this.getCurrentState().stepLabel!] || null;
  }
  get defaultAllowance(): number {
    if (this.allowanceKey === 'characteristics') return 80;
    if (this.allowanceKey !== 'bonus') return 100;
    const age = this.character.age || 0;
    return age < 11 ? 0 : age < 17 ? 100 : age < 28 ? 150 : age < 44 ? 200 : age < 65 ? 250 : 300;
  }
  get ruleHint(): string {
    return ({
      Characteristics: 'Humans: roll 3d6 for STR, CON, DEX, POW and CHA, and 2d6+6 for INT and SIZ; or distribute 80 points. The characteristics chapter gives a human point-build minimum of 8 for INT and SIZ, and 3 for the others; maximum 18.',
      Culture: 'Allocate 100 points across cultural skills and an optional combat style. Choose up to three professional skills; the usual increase is 5–15 points per selected skill. Customs and Native Tongue each receive +40%.',
      Career: 'Choose up to three career professional skills. Allocate 100 points across career skills and styles, normally at most 15 points to any one skill.',
      'Experience through Age': 'Bonus allowance by age category: Young 100 / +10 per skill; Adult 150 / +15; Middle Aged 200 / +20; Senior 250 / +25; Old 300 / +30. Your GM can change either allowance.',
      Hobby: 'Choose one additional professional skill or combat style to represent a personal hobby. Improve it using bonus skill points.',
      'Starting Magic': 'Starting magicians normally know one relevant spell or ability for each 20% (or part thereof) in the appropriate magical skill. Availability depends on the campaign and tradition.',
      Customization: 'Add your own skills, fighting styles, magic, equipment and organizations. Custom entries are saved with the character and included in the printable supplement.'
    } as Record<string,string>)[this.getCurrentState().stepLabel!] || '';
  }

  get isCustomization(): boolean {
    return this.getCurrentState().component === CustomizationComponent;
  }

  get customizationHint(): string {
    return ({
      Details: 'You can add custom skills, combat styles, traits, magic, equipment and organizations at any time. You do not need to wait for step 18.',
      Culture: 'Want your own combat style or professional skill? Choose “Create custom combat style” in the style picker, or create a skill in the professional-skill picker. Customization also lets you edit styles, traits and bonuses.',
      Career: 'Custom combat styles and professional skills are available in their selection pickers. Open Customization to edit your styles, traits, skills and bonuses at any time.',
      Hobby: 'Create a custom combat style or professional skill directly in its picker, or open Customization to edit your own entries.',
      'Experience through Age': 'Need another skill or combat style? Add it in Customization, then return here to allocate bonus points.',
      'Cults & Brotherhoods': 'Create your own cults, brotherhoods and factions in Customization, including ranks and campaign notes.',
      'Starting Magic': 'Add custom spells and abilities from any magical tradition in Customization.',
      'Starting Equipment': 'Create custom weapons, armour, items and other equipment in Customization.'
    } as Record<string, string>)[this.getCurrentState().stepLabel!] || '';
  }

  openCustomization(): void {
    if (this.isCustomization) return;
    this.customizationReturnStep = this.pageState;
    this.goToStep(this.states.findIndex(state => state.component === CustomizationComponent));
  }

  returnFromCustomization(): void {
    if (this.customizationReturnStep === null) return;
    const target = this.customizationReturnStep;
    this.customizationReturnStep = null;
    this.goToStep(target);
  }

  preview(): void {
    this.flushSave();
    if (this.storage.error) return;
    this.storage.setJson('view-character', this.character);
    this.router.navigate(['/view/responsive']);
  }

  download(): void {
    this.flushSave();
    downloadJson(this.character, (this.character.name || 'character') + '.json');
  }

  @HostListener('document:visibilitychange')
  onVisibilityChange(): void { if (document.hidden) this.flushSave(); }

  toggleSidebar(): void {
    if (window.innerWidth > 959) {
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
    if (window.innerWidth <= 959) {
      this.sidebarOpen = false;
    }
  }
}
