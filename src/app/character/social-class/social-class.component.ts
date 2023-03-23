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
      rollMany(4, 6) * this.getCulture().multiplier;
  }

  getCulture(): any {
    return this.startingMoneyModifiers.find(
      (x) => x.culture == this.character.culture
    );
  }

  getMoneyAfterClass(): number {
    if (
      !this.character.socialClass ||
      !this.character.socialClass.moneyMultiplier
    )
      return 1 * this.character.startingMoney;
    return (
      this.character.socialClass.moneyMultiplier * this.character.startingMoney
    );
  }

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
    this.character.socialClass = this.getSocialClassesForCulture().find((x) => {
      return dice <= x.percHigh && dice >= x.percLow;
    })!.socialClass;
  }

  findSocialClass() {
    return this.getSocialClassesForCultureNoPerc().find((x) => {
      return JSON.stringify(x) == JSON.stringify(this.character.socialClass);
    });
  }
}
