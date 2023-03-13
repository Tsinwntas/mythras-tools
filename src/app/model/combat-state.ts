import { StateComponent } from './state-component';
export class CombatState {
    stepLabel : string;
    next? : { target: number, label? : string , click? : ()=>void }[];
    component?: StateComponent;
}