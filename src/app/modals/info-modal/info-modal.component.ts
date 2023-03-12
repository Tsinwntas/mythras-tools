import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, Inject, ViewChildren, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements AfterViewInit{

  component : ModalInnerContent;
  @ViewChildren('infoComponent', {read: ViewContainerRef}) public infoComponent: QueryList<ViewContainerRef>;

  constructor(
    public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private resolver: ComponentFactoryResolver
  ) {
    this.component = data?.component;
    this.passProps(data?.props);
  }

  getHeader() : string {
    if(!this.component)
      return "Info";
    return (this.component as any)['prototype'].getHeader();
  }

  getSources() : string {
    if(!this.component)
      return "";
    try{
      return (this.component as any)['prototype'].getSources();
    } catch(e){
      return "";
    }
  }

  passProps(props : any) {
    if(props)
    (this.component as any)['prototype'].setProps(props);
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
      this.infoComponent.get(0)!.createComponent(componentFactory);
  }

}

export interface ModalData{
  component : ModalInnerContent;
  props? : any;
}
