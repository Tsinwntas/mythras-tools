import { AttackOptionsComponent } from './../attack-options/attack-options.component';
import { EndOfCycleComponent } from './../end-of-cycle/end-of-cycle.component';
import { CompareResultsComponent } from './../compare-results/compare-results.component';
import { DefenderActionComponent } from './../defender-action/defender-action.component';
import { AttackerActionComponent } from './../attacker-action/attacker-action.component';
import { StartOfCombatCycleComponent } from './../start-of-combat-cycle/start-of-combat-cycle.component';
import { FatigueCheckComponent } from './../fatigue-check/fatigue-check.component';
import { StartOfCombatRoundComponent } from './../start-of-combat-round/start-of-combat-round.component';
import { StartOfCombatComponent } from './../start-of-combat/start-of-combat.component';
import { AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CombatState } from 'src/app/model/combat-state';
import { FreeActionsComponent } from '../free-actions/free-actions.component';

@Component({
  selector: 'app-combat-flow',
  templateUrl: './combat-flow.component.html',
  styleUrls: ['./combat-flow.component.scss']
})
export class CombatFlowComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild('stepper') stepper: MatStepper | undefined;

  userType : UserTypes;
  switchedType : boolean;
  UserTypes = UserTypes;
  states : CombatState[] = [
    {
      stepLabel: "Start of Combat",
      component: StartOfCombatComponent,
    },
    {
      stepLabel: "Start of Combat Round",
      component: StartOfCombatRoundComponent
    },
    {
      stepLabel: "Fatigue Check: Endurance roll or lose Fatigue level",
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
        {target:4, label:"Next in Initiative"},{target:2, label: "Next Round"}
      ]
    }
  ];
  combatState : number;

  constructor(private resolver: ComponentFactoryResolver){
    this.userType=UserTypes.UNKNOWN;
  } 
  
  ngDoCheck() {
    localStorage['user-type'] = this.userType;
    localStorage['combat-state'] = this.combatState;
  }

  ngOnInit(): void {
    if(localStorage['combat-state'])
      this.combatState = localStorage['combat-state'];
    if(localStorage['user-type'])
      this.userType = localStorage['user-type'];
  }
  
  ngAfterViewInit() {
    if(this.stepper){
      setTimeout(()=>{
        if(this.combatState)
          this.stepper!.selectedIndex = this.combatState;
        this.loadComponent();
      },0)
    }
  }

  ngAfterViewChecked(): void {
    if(this.stepper){
      setTimeout(()=>{
        this.stepper!._getIndicatorType = () => 'number';
        if(this.switchedType){
          this.switchedType = false;
          this.loadComponent();
        }
      },0)
    }
  }

  setUserType(type : UserTypes) {
    this.userType = type;
  }
 
  onStepChange(event: any): void {
    this.combatState = event.selectedIndex;
  }

  stepTo(index: any){
    this.combatState = index;
    this.stepper!.selectedIndex = index;
  }

  @ViewChildren('stateComponents', {read: ViewContainerRef}) public stateComponents: QueryList<ViewContainerRef>;

  loadComponent(): void {
    for (let i = 0; i < this.stateComponents.toArray().length; i++) {
      let target = this.stateComponents.toArray()[i];
      let tabComponent = this.states[i].component;
      if(!tabComponent)
        continue;
      let componentFactory =
      this.resolver.resolveComponentFactory((tabComponent!) as any);

      target.clear();
      target.createComponent(componentFactory);
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
