import { AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CombatState } from 'src/app/model/combat-state';

@Component({
  selector: 'app-state-page',
  templateUrl: './state-page.component.html',
  styleUrls: ['./state-page.component.scss']
})
export class StatePageComponent  implements OnInit, AfterViewInit, AfterViewChecked{


  @ViewChild('stepper') stepper: MatStepper | undefined;
  @ViewChildren('stateComponents', {read: ViewContainerRef}) public stateComponents: QueryList<ViewContainerRef>;
  
  loading : boolean;
  states : CombatState[] = [];
  pageState : number;
  switchedType : boolean;

  constructor(private resolver: ComponentFactoryResolver){
      
  }

  ngOnInit(): void {
    //override    
  }

  ngDoCheck() {
    //override
  }
    
  ngAfterViewInit() {
    if(this.stepper){
      setTimeout(()=>{
        if(this.pageState)
          this.stepper!.selectedIndex = this.pageState;
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
          this.stepper!.selectedIndex = this.pageState;
          this.loadComponent();
        }
      },0)
    }
  }

  getStates() : CombatState[] {
    return this.states;
  }

  onStepChange(event: any): void {
    this.pageState = event.selectedIndex;
  }

  stepTo(index: any, click?: ()=>void){
    if(index > 0){
      this.pageState = index;
      this.stepper!.selectedIndex = index;
    }
    if(click)
      click();
  }

  loadComponent(): void {
    for (let i = 0; i < this.stateComponents.toArray().length; i++) {
      let target = this.stateComponents.toArray()[i];
      let tabComponent = this.getStates()[i].component;
      if(!tabComponent)
        continue;
      let componentFactory =
      this.resolver.resolveComponentFactory((tabComponent!) as any);

      target.clear();
      this.setProps(target.createComponent(componentFactory));
    }
    setTimeout(()=>{this.loading=false;},1000);
  }

  setProps(component : ComponentRef<any>) {

  }
}