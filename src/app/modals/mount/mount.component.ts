import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.scss']
})
export class MountComponent implements ModalInnerContent {
  getHeader(): string {
    return "Mount";
  }
  

  getSources(): string {
    return "Mythras Core Rules 91";
  }
}
