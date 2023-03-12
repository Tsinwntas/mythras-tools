import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reload',
  templateUrl: './reload.component.html',
  styleUrls: ['./reload.component.scss']
})
export class ReloadComponent implements ModalInnerContent{
  getHeader(): string {
    return "Reload";
  }
  getSources(): string {
    return "Mythras Core Rules 10";
  }
}
