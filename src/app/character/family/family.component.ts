import { Character } from 'src/app/model/character';
import { Component } from '@angular/core';
import { roll, rollMany, rollWithArrayRange, rollWithTextRange } from 'src/app/services/common.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent {

  character : Character;

  rollFamily(){
    this.rollParents();
    this.rollSiblings();
    this.rollGrandparents();
    this.rollAuntsUncles();
    this.rollCousins();
    this.rollReputation();
    this.rollConnections();
  }

  rollParents(){
    this.character.family.parents = rollWithArrayRange([{range:[1,20], text:'Both Parents Living'},
     {range:[21,40], text:'Only Father Living'}, 
     {range:[41,60], text:'One birth parent living plus step-parent'}, 
     {range:[61,80], text:'Only Mother Living'}, 
     {range:[81,100], text: 'Both Parents Dead'}
    ],100).text;
  }

  rollSiblings(){
    this.character.family.siblings = roll(rollWithTextRange([
      {range:"01-10", roll:0},
      {range:"11-30", roll:4},
      {range:"31-70", roll:6},
      {range:"71-90", roll:8},
      {range:"91-00", roll:10}
    ],100).roll);
  }

  rollGrandparents(){
    let result = rollWithTextRange([
      {range:"01-10", roll:null},
      {range:"11-30", roll:[2,-1]},
      {range:"31-70", roll:[3-1]},
      {range:"71-90", roll:[3,0]},
      {range:"71-90", roll:[3,1]}
      ],100);
    this.character.family.grands = rollMany(1, result.roll[0], result.roll[1]);
  }

  rollAuntsUncles(){
    this.character.family.aunts = roll(rollWithTextRange([
      {range:"01-10", roll:0},
      {range:"11-30", roll:2},
      {range:"31-70", roll:3},
      {range:"71-90", roll:4},
      {range:"91-00", roll:6}
    ],100).roll);
  }

  rollCousins(){
    this.character.family.cousins = roll(rollWithTextRange([
      {range:"01-10", roll:0},
      {range:"11-30", roll:3},
      {range:"31-70", roll:4},
      {range:"71-90", roll:6},
      {range:"91-00", roll:8}
    ],100).roll);
  }

  rollReputation(){
    let result = rollWithTextRange([
      {range:"01-15", text:"Poor", dice:3, contact:0},
      {range:"16-35", text:"Sound but perhaps with secrets", dice:1, contact:0},
      {range:"36-65", text:"Sound"},
      {range:"66-85", text:"Good but possibly with those resentful", dice:1, contact:1},
      {range:"86-100", text:"Untarnished; excellent standing", dice:3, contact:1}
    ],100);
    this.character.family.reputation = result.text;
    this.character.family.allies = 0;
    this.character.family.contacts = 0;
    this.character.family.rivals = 0;
    this.character.family.enemies = 0;

    if(!result.dice)
      return;
    let choice = Math.random()>=0.5;
    switch(result.contact){
      case 0:{
        if(choice)
          this.character.family.enemies = roll(result.dice);
        else
          this.character.family.rivals = roll(result.dice);
        return;
      }
      case 1:{
        if(choice)
          this.character.family.allies = roll(result.dice);
        else
          this.character.family.contacts = roll(result.dice);
        return;
      }
    }
  }

  rollConnections(){
    let result = rollWithTextRange([
      {range:"01-20", text:"None of note.", times:0},
      {range:"21-80", text:"Reasonable connections within community.", times:1},
      {range:"81-90", text:"Well-connected, and known to local powers.", times:2},
      {range:"91-95", text:"Well-connected, and known to regional powers.", times:3},
      {range:"96-00", text:"Well connected, and known to national power.", times:4}
    ],100);
    this.character.family.connections = result.text;
    for(let i = 0; i < result.times; i++){
      switch(roll(4)){
        case 1:{
          this.character.family.allies++;
          return;
        }
        case 2:{
          this.character.family.contacts++;
          return;
        }
        case 3:{
          this.character.family.enemies++;
          return;
        }
        case 4:{
          this.character.family.rivals++;
          return;
        }
      }
    }
  }

}
