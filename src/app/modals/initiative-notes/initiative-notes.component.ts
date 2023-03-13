import { TableService } from './../../services/table.service';
import { TableComponent } from 'src/app/table-component/table.component';
import { RoundHolder } from './../../model/round-holder';
import { ModalInnerContent } from './../../model/modal-inner-content';
import { Component, OnInit } from '@angular/core';
import { Initiative } from 'src/app/model/initiative';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-initiative-notes',
  templateUrl: './initiative-notes.component.html',
  styleUrls: ['./initiative-notes.component.scss']
})
export class InitiativeNotesComponent extends TableComponent implements ModalInnerContent, OnInit {
  round : RoundHolder;
  initiative: Initiative = new Initiative();

  getObservable() : Observable<boolean> {
    (window as any)['loadingSubject'] = new Subject<boolean>();
    let obs = (window as any)['loadingObs'] = (window as any)['loadingSubject'].asObservable();
    return obs;
  }

  getHeader(): string {
    return "Initiative Notes";
  }
  setProps(props: any): void {
    this.round = props.round;
  }

  ngOnInit(): void {
    if(localStorage['initiative'])
      this.initiative = Object.assign(new Initiative(), JSON.parse(localStorage['initiative']));
  }

  ngDoCheck() {
    localStorage['initiative']=JSON.stringify(this.initiative);
  }

  override getTable(): any[] {
    if(!this.initiative.participants.length)
      this.addParticipant();
    return this.initiative.participants;
  }
  
  override getColumnsDefinition(): string[] {
    return super.getColumnsDefinition().concat(['remove']);
  }

  getSuperDefs(): string[]{
    return super.getColumnsDefinition();
  }

  override getEmptyColumns(): string[] {
    return ['remove'];
  }

  override getColumnHeader(col: string): string {
    if(col == 'initiative')
      return '#';
    let header = super.getColumnHeader(col);
    let split = header.split(" ");
    if(split.length==1)
      return header;
    return split[0][0]+split[1][0];
  }

  getInputLabel(col : string) : string {
    return super.getColumnHeader(col);
  }

  addParticipant(){
    this.initiative.participants.push({
      initiative:0,
      name: 'Nameth McName',
      actionPoints: 3,
      head: 0,
      chest: 0,
      abdoment: 0,
      leftArm: 0,
      rightArm: 0,
      leftLeg: 0,
      rightLeg: 0,
    });
    localStorage['initiative']=JSON.stringify(this.initiative);
    (window as any)['loadingSubject'].next(true);
  }

  removeParticipant(index : number){
    this.initiative.participants.splice(index,1);
    if(!this.initiative.participants.length)
      this.addParticipant();
    localStorage['initiative']=JSON.stringify(this.initiative);
    (window as any)['loadingSubject'].next(true);
  }

  getFatigues() {
    if(!this.round.round)
      this.round.round = 1;
    return [{label:'1-5',div:2}, {label:'6-10',div:3}, {label:'11-15',div:4}, {label:'16-20',div:5}]
    .filter(c=>{
      let val = this.round.round/c.div;
      return Math.floor(val) == val;
    }).map(c=>c.label).join(", ");
  }

}
