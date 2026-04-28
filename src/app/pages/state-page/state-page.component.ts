import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { CombatState } from 'src/app/model/combat-state';

@Component({
  selector: 'app-state-page',
  templateUrl: './state-page.component.html',
  styleUrls: ['./state-page.component.scss']
})
export class StatePageComponent  implements OnInit, AfterViewInit{


  @ViewChildren('stateComponents', {read: ViewContainerRef}) public stateComponents: QueryList<ViewContainerRef>;
  
  loading : boolean;
  states : CombatState[] = [];
  pageState : number;

  constructor(private resolver: ComponentFactoryResolver){
      
  }

  ngOnInit(): void {
    //override    
  }

  ngDoCheck() {
    //override
  }
    
  ngAfterViewInit() {}

  getStates() : CombatState[] {
    return this.states;
  }

  onStepChange(event: any): void {
    this.pageState = event.selectedIndex;
  }

  stepTo(index: any, click?: ()=>void){
    if(index >= 0){
      this.pageState = index;
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
