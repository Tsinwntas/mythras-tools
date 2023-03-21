import { Component, Input } from '@angular/core';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';

@Component({
  selector: 'app-traits',
  templateUrl: './traits.component.html',
  styleUrls: ['./traits.component.scss']
})
export class TraitsComponent implements ModalInnerContent {

  @Input() trait: {name: string, trait: string};
  @Input() source : string;

  getHeader(): string {
    return this.trait.name;
  }

  getSources(): string {
    return this.source ? this.source : "Mythras Core Rules";
  }

  setProps(props: any): void {
    this.trait = props.trait;
    this.source = props.source;
  }
}
