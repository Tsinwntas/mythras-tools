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
import { AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CombatState } from 'src/app/model/combat-state';
import { FreeActionsComponent } from '../free-actions/free-actions.component';
import { StatePageComponent } from '../state-page/state-page.component';

@Component({
  selector: 'app-combat-flow',
  templateUrl: './combat-flow.component.html',
  styleUrls: ['./combat-flow.component.scss'],
})
export class CombatFlowComponent extends StatePageComponent {

  userType : UserTypes;
  UserTypes = UserTypes;
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
      component: CompareResultsComponent,
      next: [
        {target:0, label: "Back to start"}
      ]
    }
  ]
  round : RoundHolder = {round : 1};
  constructor(private resolverLocal: ComponentFactoryResolver){
    super(resolverLocal);
    this.userType=UserTypes.UNKNOWN;
  } 

  override ngOnInit(){
    if(localStorage['user-type'])
        this.userType = localStorage['user-type'];
      if(localStorage['round'] != undefined)
        this.round.round = parseInt(localStorage['round']);
      this.updateCombatState();
  }
  
  override ngDoCheck() {
    localStorage['user-type'] = this.userType;
    if(this.userType == UserTypes.GM)
      localStorage['combat-state-gm'] = this.pageState;
    if(this.userType == UserTypes.PLAYER)
      localStorage['combat-state-player'] = this.pageState;
    localStorage['round']=this.round.round;
    
  }

  override getStates() : CombatState[] {
      if(this.userType == UserTypes.GM)
        return this.states;
      return this.player_states;
  }

  setUserType(type : UserTypes) {
    this.loading=true;
    this.userType = type;
    this.switchedType=true;
    this.updateCombatState();
  }

  updateCombatState(){
    if(this.userType == UserTypes.GM)
      this.pageState = localStorage['combat-state-gm'] ? localStorage['combat-state-gm'] : 0;
    if(this.userType == UserTypes.PLAYER)
      this.pageState = localStorage['combat-state-player'] ? localStorage['combat-state-player'] : 0;
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
