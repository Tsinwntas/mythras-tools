import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weapons-not-covered',
  templateUrl: './weapons-not-covered.component.html',
  styleUrls: ['./weapons-not-covered.component.scss']
})
export class WeaponsNotCoveredComponent implements ModalInnerContent {
  getHeader(): string {
    throw new Error('Method not implemented.');
  }
  getSources?(): string {
    return "Mythras Core Rules 88";
  }

}
