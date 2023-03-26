import { TheismCults, AnimistCults, Brotherhoods, SorceryOrders, MysticalOrders } from './../../services/cults.service';
import { Character } from 'src/app/model/character';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cult',
  templateUrl: './cult.component.html',
  styleUrls: ['./cult.component.scss'],
})
export class CultComponent {
  character: Character;
  theistCults: {
    name: string;
    level: string;
    standardSkills: string;
    professionalSkills: string;
    miracles: string;
  }[] = TheismCults

  getTheistCultRanks(): string[] {
    return ['Lay Member', 'Initiate', 'Acolyte', 'Priest', 'High Priest'];
  }

  getTheistCult(): {
    name: string;
    level: string;
    standardSkills: string;
    miracles: string;
  } {
    return this.theistCults.find(
      (c) => c.name == this.character.theistCult.name
    )!;
  }

  setTheistCult(cult: { name: string; level: string; standardSkills: string; professionalSkills: string; miracles: string }) {
    if(!cult)
      this.character.theistCult = {
        name: '',
        level: '',
        standardSkills: '',
        professionalSkills: '',
        miracles: '',
      };
    else 
      this.character.theistCult = cult;
  }

  ////////////////////////////////////////////////////////////////
  animistCults: {
    name: string;
    level: string;
    standardSkills: string;
    professionalSkills: string;
    spirits: string;
  }[] = AnimistCults

  getAnimistCultRanks(): string[] {
    return ['Follower', 'Spirit Worshipper', 'Shaman', 'High Shaman', 'Spirit Lord'];
  }

  getAnimistCult(): {
    name: string;
    level: string;
    standardSkills: string;
    spirits: string;
  } {
    return this.animistCults.find(
      (c) => c.name == this.character.animistCult.name
    )!;
  }

  setAnimistCult(cult: { name: string; level: string; standardSkills: string; professionalSkills: string; spirits: string }) {
    if(!cult)
      this.character.animistCult = {
        name: '',
        level: '',
        standardSkills: '',
        professionalSkills: '',
        spirits: '',
      };
    else 
      this.character.animistCult = cult;
  }

  ////////////////////////////////////////////////////////////////
  sorceryOrders: {
    name: string;
    level: string;
    standardSkills: string;
    professionalSkills: string;
    spells: string;
  }[] = SorceryOrders

  getSorceryOrderRanks(): string[] {
    return ['Novice', 'Apprentice', 'Adept', 'Mage', 'Arch Mage'];
  }

  getSorceryOrder(): {
    name: string;
    level: string;
    standardSkills: string;
    spells: string;
  } {
    return this.sorceryOrders.find(
      (c) => c.name == this.character.sorceryOrder.name
    )!;
  }

  setSorceryOrder(cult: { name: string; level: string; standardSkills: string; professionalSkills: string; spells: string }) {
    if(!cult)
      this.character.sorceryOrder = {
        name: '',
        level: '',
        standardSkills: '',
        professionalSkills: '',
        spells: '',
      };
    else 
      this.character.sorceryOrder = cult;
  }

  ////////////////////////////////////////////////////////////////
  mysticalOrders: {
    name: string;
    level: string;
    standardSkills: string;
    professionalSkills: string;
    paths: string;
  }[] = MysticalOrders

  getMysticalOrderRanks(): string[] {
    return ['Aspirant', 'Student', 'Disciple', 'Master', 'Sage'];
  }

  getMysticalOrder(): {
    name: string;
    level: string;
    standardSkills: string;
    paths: string;
  } {
    return this.mysticalOrders.find(
      (c) => c.name == this.character.mysticalOrder.name
    )!;
  }

  setMysticalOrder(cult: { name: string; level: string; standardSkills: string; professionalSkills: string; paths: string }) {
    if(!cult)
      this.character.mysticalOrder = {
        name: '',
        level: '',
        standardSkills: '',
        professionalSkills: '',
        paths: '',
      };
    else 
      this.character.mysticalOrder = cult;
  }

  ////////////////////////////////////////////////////////////////
  brotherhoods: {
    name: string;
    level: string;
    standardSkills: string;
    professionalSkills: string;
  }[] = Brotherhoods

  getBrotherhoodRanks(): string[] {
    return ['Associate', 'Apprentice', 'Journeyman', 'Master', 'Grand Master'];
  }

  getBrotherhood(): {
    name: string;
    level: string;
    standardSkills: string;
  } {
    return this.brotherhoods.find(
      (c) => c.name == this.character.brotherhood.name
    )!;
  }

  setBrotherhood(cult: { name: string; level: string; standardSkills: string; professionalSkills: string }) {
    if(!cult)
      this.character.brotherhood = {
        name: '',
        level: '',
        standardSkills: '',
        professionalSkills: '',
      };
    else 
      this.character.brotherhood = cult;
  }
}
