import { getMoneyAfterClass } from 'src/app/services/character-service.service';
import { roll, rollMany } from 'src/app/services/common.service';
import { Character } from 'src/app/model/character';
import { Component, OnInit } from '@angular/core';
import { getSocialClassesOfCulture } from 'src/app/model/social-classes';

@Component({
  selector: 'app-social-class',
  templateUrl: './social-class.component.html',
  styleUrls: ['./social-class.component.scss'],
})
export class SocialClassComponent implements OnInit {
  character: Character;
  startingMoneyModifiers: any[] = [
    {
      culture: 'Barbarian',
      multiplier: 50,
    },
    {
      culture: 'Civilized',
      multiplier: 75,
    },
    {
      culture: 'Nomadic',
      multiplier: 25,
    },
    {
      culture: 'Primitive',
      multiplier: 10,
    },
  ];

  ngOnInit() {
    if (!this.character.culture) {
      return;
    }
    if (this.character.startingMoney == undefined) this.rollStartingMoney();
  }

  rollStartingMoney() {
    this.character.startingMoney =
      rollMany(4, 6) * (this.getCulture()?.multiplier ?? 0);
  }

  getCulture(): any {
    return this.startingMoneyModifiers.find(
      (x) => x.culture == this.character.culture
    );
  }

  getMoneyAfterClass(): number {
    return getMoneyAfterClass(this.character);
  }

  getMoneyMultiplier(): number { return this.character.socialClass.moneyMultiplier ?? 1; }

  getSocialClassesForCulture() {
    if (!this.character.culture) {
      return [];
    }
    return getSocialClassesOfCulture(this.character.culture);
  }

  getSocialClassesForCultureNoPerc() {
    return this.getSocialClassesForCulture().map((x) => x.socialClass);
  }

  getSocialClasssesTable() {
    return this.getSocialClassesForCulture().map((x) => ({
      range: x.percLow + (x.percHigh != x.percLow ? '-' + x.percHigh : ''),
      class: x.socialClass.class,
      titles: x.socialClass.titles,
      money: x.socialClass.moneyMultiplier,
      resources: x.socialClass.resources,
    }));
  }

  rollSocialClass() {
    let dice = roll(100);
    const selected = this.getSocialClassesForCulture().find((x) => {
      return dice <= x.percHigh && dice >= x.percLow;
    });
    if (selected) this.character.socialClass = { ...selected.socialClass };
  }

  selectClass(name: string): void {
    const selected = this.getSocialClassesForCultureNoPerc().find(entry => entry.class === name);
    this.character.socialClass = selected ? { ...selected } : { class:'', titles:'', resources:'', moneyMultiplier:1 };
  }

  findSocialClass() {
    return this.getSocialClassesForCultureNoPerc().find(entry => entry.class === this.character.socialClass.class);
  }
}
