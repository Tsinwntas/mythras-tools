import { orZero } from 'src/app/services/common.service';
import {
  getSkillBase,
  getSkillTotal,
  getDamageModifier,
  getMoneyAfterClass,
  getTotalFromItems,
} from 'src/app/services/character-service.service';
import { Skill } from 'src/app/model/skill';
import { Character } from 'src/app/model/character';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CharacterPassions } from 'src/app/model/character-passions';

@Component({
  selector: 'character-pdf',
  templateUrl: './character-pdf.component.html',
  styleUrls: ['./character-pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPdfComponent {
  @Input() character: Character;

  getSkill(skill: Skill): number | string {
    if (skill.name == 'Damage Modifier')
      return getDamageModifier(this.character);
    return getSkillTotal(this.character, skill);
  }

  getFixedSkill(skill: string): number | string {
    let actualSkill = this.getActualSkill(skill);
    if (!actualSkill) return '';
    return this.getSkill(this.getActualSkill(skill)!);
  }

  setFixedSkill(skill: string, value: any) {
    let actualSkill = this.getActualSkill(skill);
    if (!actualSkill) return;
    actualSkill.extraBonus =
      parseInt(value.target.value) -
      parseInt(this.getSkill(actualSkill).toString()) +
      orZero(actualSkill.extraBonus);
  }

  getActualSkill(skill: string): Skill | undefined {
    return this.character.skills.skills
      .concat(this.character.skills.specialized)
      .concat([this.character.skills.hobby])
      .find((s) => s && s.name == skill);
  }

  getProffSkills(skill?: string): Skill[] {
    return this.character.skills.skills
      .concat(this.character.skills.specialized)
      .concat([this.character.skills.hobby])
      .filter(
        (s) =>
          s &&
          s.professional &&
          ((!skill && !s.name.includes('Language')) ||
            (skill && s.name.includes(skill) && s.name != skill))
      );
  }

  getProfSkillName(index: number, skill?: string): string {
    let actualSkill = this.getActualProfSkill(index, skill);
    if (!actualSkill) return '';
    return actualSkill.name;
  }

  setProfSkillName(value: any, index: number, skill?: string) {
    let actualSkill = this.getActualProfSkill(index, skill);
    if (!value.target.value && actualSkill && actualSkill.force) {
      actualSkill.force = false;
    }

    let foundSkill = this.getActualSkill(value.target.value);
    if (
      foundSkill &&
      !foundSkill.careerBonus &&
      !foundSkill.cultureBonus &&
      !foundSkill.extraBonus
    ) {
      foundSkill.force = true;
    }
  }

  getProfBaseSkill(index: number, skill?: string): number | string {
    let actualSkill = this.getActualProfSkill(index, skill);
    if (!actualSkill) return '';
    return getSkillBase(this.character, actualSkill);
  }

  getProfSkill(index: number, skill?: string): number | string {
    let actualSkill = this.getActualProfSkill(index, skill);
    if (!actualSkill) return '';
    return this.getSkill(actualSkill!);
  }

  setProfSkill(value: any, index: number, skill?: string) {
    let actualSkill = this.getActualProfSkill(index, skill);
    if (!actualSkill) return;
    actualSkill.extraBonus =
      parseInt(value.target.value) -
      parseInt(this.getSkill(actualSkill).toString()) +
      orZero(actualSkill.extraBonus);
  }

  getActualProfSkill(index: number, skill?: string): Skill | undefined {
    return this.getProffSkills(skill).filter(
      (s) => s.force || !(!s.careerBonus && !s.cultureBonus && !s.extraBonus)
    )[index];
  }

  getDevotion(): number {
    let skill = this.getDevotionSkill();
    if (!skill) return 0;
    return getSkillTotal(this.character, skill);
  }

  setDevotion(value: any) {
    let skill = this.getDevotionSkill();
    if (!skill) return;
    skill.extraBonus =
      parseInt(value.target.value) -
      parseInt(this.getSkill(skill).toString()) +
      orZero(skill.extraBonus);
  }

  getDevotionSkill(): Skill {
    return this.character.skills.skills
      .concat(this.character.skills.hobby)
      .concat(this.character.skills.specialized)
      .filter((s) => s.name.includes('Devotion'))
      .sort(
        (a, b) =>
          getSkillTotal(this.character, b) - getSkillTotal(this.character, a)
      )[0];
  }

  getPassion(index: number) : string {
    let passion = this.character.passions[index];
    if(passion)
      return passion.passion;
    return '';
  }

  setPassion(index: number, event: any){
    if(!this.character.passions[index] && !event.target.value)
      return;
    if(!this.character.passions[index] && event.target.value)
      this.character.passions[index] = new CharacterPassions();
    this.character.passions[index].passion = event.target.value;
  }

  getPassionPerc(index: number) : number | string {
    let passion = this.character.passions[index];
    if(passion)
      return passion.modifierNumber;
    return '';
  }

  setPassionPerc(index: number, event: any){
    if(!this.character.passions[index] && !event.target.value)
      return;
    if(!this.character.passions[index] && event.target.value)
      this.character.passions[index] = new CharacterPassions();
    this.character.passions[index].modifierNumber = parseInt(event.target.value);
  }

  getOrCreateBackground() : string {
    if(!this.character.backgroundOverall)
      this.generateBackground();
    return this.character.backgroundOverall;
  }

  setBackground(event : any) {
    this.character.backgroundOverall = event.target.value;
  }

  generateBackground() {
    let background = "";
    if(this.character.backgroundEvents)
      this.character.backgroundEvents.forEach(b=>background += b.text+"\n");
    if(this.character.family){
      background += `${this.character.family.parents}, Siblings: ${this.character.family.siblings}, Grandparents: ${this.character.family.grands}, Uncles/Aunts: ${this.character.family.aunts}, Cousins: ${this.character.family.cousins}.\n
Reputation: ${this.character.family.reputation}\n
Connections: ${this.character.family.connections.trim()}\n

${this.character.family.text}\n\n`;
    if(this.character.background)
      background += `${this.character.background}\n\n`;   
    }
    this.character.backgroundOverall= background.trim();
  }

  getOrCreateContacts() : string {
    if(!this.character.contactsOverall)
      this.generateContacts();
    return this.character.contactsOverall;
  }

  setContacts(event : any) {
    this.character.contactsOverall = event.target.value;
  }

  generateContacts() {
    let family = this.character.family;
    this.character.contactsOverall= `Contacts: ${family.contacts}
Allies: ${family.allies}
Enemies: ${family.enemies}`.trim();
  }

  getOrCreateMoney() : string {
    if(!this.character.moneyOverall)
      this.generateMoney();
    return this.character.moneyOverall;
  }

  setMoney(event : any) {
    this.character.moneyOverall = event.target.value;
  }

  generateMoney() {
    let money = getMoneyAfterClass(this.character) -
    getTotalFromItems(this.character, 'cost');
    let social = this.character.socialClass;
    this.character.moneyOverall= `Money: ${Math.floor(money)} S, ${Math.floor((money-Math.floor(money))*100)} C

${social?social.resources:''}`.trim();
  }

  getAthletics() : number {
    return orZero(this.getFixedSkill('Athletics') as any);
  }

  getSwimSkill() : number {
    return orZero(this.getFixedSkill('Swim') as any);
  }

  getHeight() : number {
    let height = this.character.height;
    if(!height)
      return 0;
    if(height < 10)
      return height;
    return height/100;
  }

  getRun() :number {
    return (parseInt(this.character.movementRate as any) + (Math.floor(this.getAthletics()/25)*0.5))*3;
  }

  getSprint() :number {
    return (parseInt(this.character.movementRate as any) + (Math.floor(this.getAthletics()/25)*0.5))*5;
  }

  getHorizontal() :number {
    return (this.getHeight()*2)+Math.floor(this.getAthletics()/20);
  }

  getVertical() :number {
    return (this.getHeight()*2)+Math.floor(this.getAthletics()/20)*0.2;
  }

  getSwim() :number {
    return parseInt(this.character.movementRate as any) + Math.floor(this.getSwimSkill()/20);
  }
}