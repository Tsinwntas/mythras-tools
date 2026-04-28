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
  private indicatorTypeSet = false;

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
        this.setIndicatorType();
        if(this.pageState)
          this.stepper!.selectedIndex = this.pageState;
        this.loadComponent();
      },0)
    }
  }

  ngAfterViewChecked(): void {
    this.setIndicatorType();
    if(this.stepper && this.switchedType){
      this.switchedType = false;
      setTimeout(() => {
        this.stepper!.selectedIndex = this.pageState;
        this.loadComponent();
      }, 0);
    }
  }

  private setIndicatorType(): void {
    if(!this.stepper || this.indicatorTypeSet)
      return;
    // TODO: find better way to change indicator type.
    this.stepper._getIndicatorType = () => 'number';
    this.indicatorTypeSet = true;
  }

  getStates() : CombatState[] {
    return this.states;
  }

  onStepChange(event: any): void {
    this.pageState = event.selectedIndex;
  }

  stepTo(index: any, click?: ()=>void){
    if(index >= 0){
      this.pageState = index;
      this.stepper!.selectedIndex = index;
    }
    if(click)
      click();
  }

  loadComponent(): void {
    const components = this.stateComponents.toArray();
    const states = this.getStates();
    for (let i = 0; i < components.length; i++) {
      let target = components[i];
      let tabComponent = states[i].component;
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
