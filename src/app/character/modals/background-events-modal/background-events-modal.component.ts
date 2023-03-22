import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { BackgroundEventsService } from './../../../services/background-events.service';
import { Rollable } from './../../../model/rollable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-background-events-modal',
  templateUrl: './background-events-modal.component.html',
  styleUrls: ['./background-events-modal.component.scss']
})
export class BackgroundEventsModalComponent implements ModalInnerContent {

  backgroundEvents : Rollable[];

  constructor(private backgroundService: BackgroundEventsService) {
    this.backgroundEvents = backgroundService.getBackgroundEvents();
  }

  getHeader() : string {
    return 'Background Events';
  }

  getSources() : string { 
    return "Mythras Core Rules 17-20";
  }

}
