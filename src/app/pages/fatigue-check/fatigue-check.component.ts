import { ModalInnerContent } from './../../model/modal-inner-content';
import { ModalHandlerService } from './../../services/modal-handler.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fatigue-check',
  templateUrl: './fatigue-check.component.html',
  styleUrls: ['./fatigue-check.component.scss']
})
export class FatigueCheckComponent {

  constructor(public modals: ModalHandlerService){}
}
