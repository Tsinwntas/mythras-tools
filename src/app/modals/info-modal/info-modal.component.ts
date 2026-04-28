import { Observable } from 'rxjs';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, Inject, ViewChildren, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentRef } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements AfterViewInit{

  component : ModalInnerContent;
  private componentRef?: ComponentRef<any>;
  @ViewChildren('infoComponent', {read: ViewContainerRef}) public infoComponent: QueryList<ViewContainerRef>;

  loaded : boolean;
  loadingObservable : Observable<any>;
  okFunction : {function: (props?:any)=>void,props: any}[]; 
  private props: any;

  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private resolver: ComponentFactoryResolver
  ) {
    this.component = data?.component;
    this.okFunction = [];
    this.props = data?.props;
    this.setObservable();
  }

  pressedOk(){
    if(this.okFunction.length > 0)
      this.okFunction[0].function(this.okFunction[0].props);
  }

  getHeader() : string {
    if(!this.component)
      return "Info";
    try{
      if(this.componentRef?.instance?.getHeader)
        return this.componentRef.instance.getHeader();
      return "Info";
    } catch(e){
      return "Info";
    }
  }

  getSources() : string {
    if(!this.component)
      return "";
    try{
      if(this.componentRef?.instance?.getSources)
        return this.componentRef.instance.getSources();
      return "";
    } catch(e){
      return "";
    }
  }

  passProps(props : any) {
    if(!props || !this.componentRef?.instance?.setProps)
      return;
    this.componentRef.instance.setProps(props, this.okFunction);
  }

  setObservable() {
    if(!this.componentRef?.instance?.getObservable)
      return;
    this.loadingObservable = this.componentRef.instance.getObservable();
    if(this.loadingObservable){
      this.loadingObservable.subscribe(data=>{
        if(this.componentRef?.instance?.handleObservableData)
          this.componentRef.instance.handleObservableData(data);
      this.loadComponent();
      })
    }
  }
  
  ngAfterViewInit() {
    if(this.component){
      setTimeout(()=>{
        this.loadComponent();
      },0)
    }
  }

  loadComponent(): void {
      let componentFactory =
      this.resolver.resolveComponentFactory((this.component!) as any);

      this.infoComponent.get(0)!.clear();
      this.componentRef = this.infoComponent.get(0)!.createComponent(componentFactory);
      this.passProps(this.props);
      this.setObservable();
      this.loaded = true;
  }

}

export interface ModalData{
  component : ModalInnerContent;
  props? : any;
}
