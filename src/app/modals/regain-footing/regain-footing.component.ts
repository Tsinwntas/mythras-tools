import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-regain-footing',
  templateUrl: './regain-footing.component.html',
  styleUrls: ['./regain-footing.component.scss']
})
export class RegainFootingComponent implements ModalInnerContent {
  getHeader(): string {
    return "Regain Footing";
  }
  getSources(): string {
    return "Mythras Core Rules 92";
  }

}
