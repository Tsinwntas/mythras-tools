import { RoundHolder } from './../../model/round-holder';
import { AttackOptionsComponent } from './../attack-options/attack-options.component';
import { EndOfCycleComponent } from './../end-of-cycle/end-of-cycle.component';
import { CompareResultsComponent } from './../compare-results/compare-results.component';
import { DefenderActionComponent } from './../defender-action/defender-action.component';
import { AttackerActionComponent } from './../attacker-action/attacker-action.component';
import { StartOfCombatCycleComponent } from './../start-of-combat-cycle/start-of-combat-cycle.component';
import { FatigueCheckComponent } from './../fatigue-check/fatigue-check.component';
import { StartOfCombatRoundComponent } from './../start-of-combat-round/start-of-combat-round.component';
import { StartOfCombatComponent } from './../start-of-combat/start-of-combat.component';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  HostListener,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CombatState } from 'src/app/model/combat-state';
import { FreeActionsComponent } from '../free-actions/free-actions.component';
import { StatePageComponent } from '../state-page/state-page.component';
import {
  AppStorageService,
  DebouncedSaveHandle,
} from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-combat-flow',
  templateUrl: './combat-flow.component.html',
  styleUrls: ['./combat-flow.component.scss'],
})
export class CombatFlowComponent extends StatePageComponent {

  userType : UserTypes;
  UserTypes = UserTypes;
  sidebarOpen = false;
  @ViewChild('activeStateHost', { read: ViewContainerRef })
  private activeStateHost?: ViewContainerRef;
  private sectionComponents = new Map<number, ComponentRef<any>>();
  private activeSectionIndex = -1;
  override states : CombatState[] = [
    {
      stepLabel: "Start of Combat",
      component: StartOfCombatComponent,
    },
    {
      stepLabel: "Start of Combat Round",
      component: StartOfCombatRoundComponent
    },
    {
      stepLabel: "Fatigue Check at start of Round",
      component: FatigueCheckComponent
    },
    {
      stepLabel: "Start of a Cycle in Combat Round",
      component: StartOfCombatCycleComponent
    },
    {
      stepLabel: "Attacker spends an Action Point if they can",
      component: AttackerActionComponent,
      next: [
        {target:5, label:"Attack"},{target:6, label: "Free Action"}
        ,{target:7, label: "Defender Action"},{target:9, label: "Skip Actions"}
      ]
    },
    {
      stepLabel: "Attack",
      component: AttackOptionsComponent
    },
    {
      stepLabel: "Free Actions (Attacker and Defender)",
      component: FreeActionsComponent
    },
    {
      stepLabel: "Defender chooses whether to spend Action Point for Defense",
      component: DefenderActionComponent
    },
    {
      stepLabel: "Compare Results",
      component: CompareResultsComponent
    },
    {
      stepLabel: "End of Cycle in Combat Round",
      component: EndOfCycleComponent,
      next: [
        {target:4, label:"Next in Initiative"},{target:2, label: "Next Round", click:()=>{this.round.round++}}
      ]
    }
  ];
  player_states: CombatState[] = [
    {
      stepLabel: "Attacker spends an Action Point if they can",
      component: AttackerActionComponent,
      next: [
        {target:1, label:"Attack"},{target:2, label: "Free Action"}
        ,{target:3, label: "Defender Action"}
      ]
    },
    {
      stepLabel: "Attack",
      component: AttackOptionsComponent,
      next: [
        {target:2, label: "Free Action"}
        ,{target:3, label: "Defender Action"}
        ,{target:4, label: "Finish Attack/Defend"}
      ]
    },
    {
      stepLabel: "Free Actions (Attacker and Defender)",
      component: FreeActionsComponent,
      next: [
        {target:1, label:"Attack"}
        ,{target:3, label: "Defender Action"}
      ]
    },
    {
      stepLabel: "Defender chooses whether to spend Action Point for Defense",
      component: DefenderActionComponent,
      next: [
        {target:1, label:"Attack"},{target:2, label: "Free Action"}
        ,{target:4, label: "Finish Attack/Defend"}
      ]
    },
    {
      stepLabel: "Compare Results",
      component: CompareResultsComponent,
      next: [
        {target:0, label: "Back to start"}
      ]
    }
  ]
  round : RoundHolder = {round : 1};
  private saveHandle: DebouncedSaveHandle;

  constructor(
    private resolverLocal: ComponentFactoryResolver,
    private storage: AppStorageService
  ){
    super(resolverLocal);
    this.userType=UserTypes.UNKNOWN;
    this.saveHandle = this.storage.createDebouncedSave(
      () => this.persistCombatState(),
      300
    );
  } 

  override ngOnInit(){
    this.syncSidebarForViewport();
    const userType = this.storage.getNumber('user-type');
    if (userType !== null) {
      this.userType = userType as UserTypes;
    }
    if(this.storage.getRaw('round') != undefined) {
      this.round.round = this.storage.getNumber('round') ?? this.round.round;
    }
    this.updateCombatState();
  }

  override ngAfterViewInit(): void {
    this.renderActiveState();
  }

  override onStepChange(event: any): void {
    this.pageState = event.selectedIndex;
    this.renderActiveState();
    this.requestSave();
  }

  override stepTo(index: any, click?: ()=>void): void {
    if(index >= 0){
      this.pageState = index;
      this.renderActiveState();
    }
    if(click)
      click();
    this.requestSave();
  }

  ngOnDestroy(): void {
    this.flushSave();
    this.saveHandle.destroy();
    this.sectionComponents.forEach((componentRef) => componentRef.destroy());
    this.sectionComponents.clear();
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

  override getStates() : CombatState[] {
      if(this.userType == UserTypes.GM)
        return this.states;
      return this.player_states;
  }

  setUserType(type : UserTypes) {
    this.loading=true;
    this.userType = type;
    this.updateCombatState();
    this.activeSectionIndex = -1;
    this.sectionComponents.forEach((componentRef) => componentRef.destroy());
    this.sectionComponents.clear();
    this.activeStateHost?.clear();
    this.renderActiveState();
    this.loading=false;
    this.requestSave();
  }

  updateCombatState(){
    if(this.userType == UserTypes.GM)
      this.pageState = this.storage.getNumber('combat-state-gm') ?? 0;
    if(this.userType == UserTypes.PLAYER)
      this.pageState = this.storage.getNumber('combat-state-player') ?? 0;
  }

  private requestSave(): void {
    this.saveHandle.schedule();
  }

  private flushSave(): void {
    this.saveHandle.flush();
  }

  private persistCombatState(): void {
    this.storage.setRaw('user-type', this.userType);
    if(this.userType == UserTypes.GM)
      this.storage.setRaw('combat-state-gm', this.pageState ?? 0);
    if(this.userType == UserTypes.PLAYER)
      this.storage.setRaw('combat-state-player', this.pageState ?? 0);
    this.storage.setRaw('round', this.round.round ?? 1);
  }

  toggleSidebar(): void {
    if (window.innerWidth > 600) {
      return;
    }
    this.sidebarOpen = !this.sidebarOpen;
  }

  goToStep(index: number): void {
    this.stepTo(index);
    if (window.innerWidth <= 600) {
      this.sidebarOpen = false;
    }
  }

  nextStep(): void {
    const next = Math.min(this.getStates().length - 1, (this.pageState ?? 0) + 1);
    this.stepTo(next);
  }

  getCurrentState(): CombatState {
    return this.getStates()[this.pageState ?? 0];
  }

  private renderActiveState(): void {
    if (!this.activeStateHost || this.userType === UserTypes.UNKNOWN) {
      return;
    }
    const states = this.getStates();
    const targetIndex = this.pageState ?? 0;
    const state = states[targetIndex];
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
        componentRef.hostView as EmbeddedViewRef<unknown>
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

enum UserTypes {
  UNKNOWN,
  GM,
  PLAYER
}

enum STATES {
  START_OF_COMBAT,

}
