import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enc-penalty',
  templateUrl: './enc-penalty.component.html',
  styleUrls: ['./enc-penalty.component.scss']
})
export class EncPenaltyComponent implements ModalInnerContent {

  enc : number

  getHeader(): string {
    return "ENC > STR x"+this.enc;
  }
  getSources(): string {
    return "Mythras Core Rules 77";
  }

  setProps(props :any): void {
    this.enc = props.enc;
  }

}
