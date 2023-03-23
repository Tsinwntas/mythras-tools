import { Character } from 'src/app/model/character';
import { Rollable } from './../../model/rollable';
import { Component, Input } from '@angular/core';
import { BackgroundEventsService } from 'src/app/services/background-events.service';
import { roll, rollWithTextRange } from 'src/app/services/common.service';

@Component({
  selector: 'app-background-events',
  templateUrl: './background-events.component.html',
  styleUrls: ['./background-events.component.scss'],
})
export class BackgroundEventsComponent {
  @Input() character: Character;

  constructor(private backgroundEventsService: BackgroundEventsService) {}

  getBackgroundEvents(): Rollable[] {
    if (!this.character.backgroundEvents) {
      this.createByAge();
    }
    return this.character.backgroundEvents;
  }

  createByAge() {
    this.character.backgroundEvents = Array.from(Array(this.getNumberOfBackgroundEvents()).keys()).map(()=>{return {range:'', text:''}});
  }

  getNumberOfBackgroundEvents() : number {
    if (!this.character.age) return 0;
    if (this.character.age <= 16) return 0;
    if (this.character.age <= 27) return 1;
    if (this.character.age <= 43) return 2;
    if (this.character.age <= 64) return 3;
    if (this.character.age <= 100) return 4;
    else return Math.ceil(this.character.age / 50) + 2;
  }

  add(){
    this.character.backgroundEvents.push({range:'', text:''});
  }

  remove(index: number){
    this.character.backgroundEvents.splice(index, 1);
  }

  roll(event: Rollable){
    let newEvent : Rollable | undefined = undefined;
    let events = this.backgroundEventsService.getBackgroundEvents();
    do{
      newEvent = rollWithTextRange(events, 100);
    } while(!newEvent || newEvent.text == event.text);
    event.text = newEvent.text;
  }
}
