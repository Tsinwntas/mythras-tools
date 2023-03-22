import { Rollable } from './../model/rollable';
import { Injectable } from '@angular/core';
import events from '../jsons/background-events.json'

@Injectable({
  providedIn: 'root'
})
export class BackgroundEventsService {

  backgroundEvents : Rollable[];

  constructor() { }

  getBackgroundEvents() : Rollable[]{
    if(!this.backgroundEvents)
      this.backgroundEvents = events;
    return this.backgroundEvents;
  }
}
