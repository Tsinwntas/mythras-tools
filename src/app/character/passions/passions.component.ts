import { Passions } from './../../services/passions.service';
import { PassionsTableComponent } from './../passions-table/passions-table.component';
import { CharacterPassions } from './../../model/character-passions';
import { Character } from 'src/app/model/character';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-passions',
  templateUrl: './passions.component.html',
  styleUrls: ['./passions.component.scss','../background-events/background-events.component.scss']
})
export class PassionsComponent implements OnInit {

  character : Character;
  passions : any[];
  ngOnInit(): void {
    if(!this.character.passions)
    {
      this.character.passions = [];
    }
    this.passions = Passions;
  }

  getPassionObjects() : string[] {
    return this.passions.map((row) => row.objectOfPassion);
  }

  findModifier(passion : CharacterPassions) : string {
    let mod = "";
    if(passion.objectOfPassion)
      mod = this.passions.find(row=>row.objectOfPassion == passion.objectOfPassion).savingPercentage;
    if(passion.modifier != mod)
    {
      passion.modifier = mod;
    }
    return passion.modifier;
  }

  add(){
    this.character.passions.push(new CharacterPassions());
  }

  remove(index: number){
    this.character.passions.splice(index, 1);
  }
}
