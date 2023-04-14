import { Weapon } from './../../model/weapon';
import { CombatStyle } from './../../model/combat-style';
import { orZero } from 'src/app/services/common.service';
import {
  getSkillBase,
  getSkillTotal,
  getDamageModifier,
  getMoneyAfterClass,
  getTotalFromItems,
  getAllCombatStyles,
  getButArmor,
  getOnlyArmor,
} from 'src/app/services/character-service.service';
import { Skill } from 'src/app/model/skill';
import { Character } from 'src/app/model/character';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CharacterPassions } from 'src/app/model/character-passions';
import { Spell } from 'src/app/model/spell';

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

  setSkill(skill: Skill, value: any) {
    if (!skill) return;
    skill.extraBonus =
      parseInt(value.target.value) -
      parseInt(this.getSkill(skill).toString()) +
      orZero(skill.extraBonus);
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
      .concat(this.character.skills.combatstyles)
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

  getCombatStyles() : CombatStyle[] {
    return getAllCombatStyles(this.character);
  }

  getActiveStyles() : CombatStyle[] {
    return this.getCombatStyles().filter((s) => s.force || !(!s.careerBonus && !s.cultureBonus && !s.extraBonus));
  }

  setStyle(value: any, index: number) {
    let actualStyle = this.getActiveStyles()[index];
    if (!value.target.value && actualStyle && actualStyle.force) {
      actualStyle.force = false;
    }

    let foundStyle = this.getCombatStyles().find(style =>style.name === value.target.value)
    if (
      foundStyle &&
      !foundStyle.careerBonus &&
      !foundStyle.cultureBonus &&
      !foundStyle.extraBonus
    ) {
      foundStyle.force = true;
    }
  }

  getStyleName(index : number) : string {
    let styles = this.getActiveStyles();
    if(styles.length <= index)
      return "";
    return styles[index].name;
  }

  getStyleWeapons(index : number) : string {
    let styles = this.getActiveStyles();
    if(styles.length <= index)
      return "";
    let weapons = styles[index].weapons;
    return Object.keys(weapons).map(key =>(weapons as any)[key].trim()).join(", ").replace(/[.]/g,"");
  }

  getStyleTrait(index: number) : string {
    let styles = this.getActiveStyles();
    if(styles.length <= index)
      return "";
    let trait = styles[index].selectedTrait;
    return trait? trait.name : "";
  }



  getWeapon(index : number, ranged: boolean): Weapon {
    return this.character.equipment.weapons.filter(w=>ranged ? w.ranged : !w.ranged)[index];
  }

  getWeaponProp(index : number, ranged: boolean, prop: string) : any {
    let weapon = this.getWeapon(index, ranged);
    if(!weapon) return "";
    return (weapon as any)[prop] ? (weapon as any)[prop] : "";

  }
  
  setWeaponProp(index: number, ranged: boolean, prop: string, event : any) {
    let weapon = this.getWeapon(index, ranged);
    if(!weapon) return;
    (weapon as any)[prop] = event.target.value;
  }

  getWeaponTraits(index : number, ranged: boolean) : string {
    let traits = this.getWeaponProp(index, ranged, 'traits');
    if(traits == "")
      traits = [];
    return traits.map((t:any)=>t.name).filter((t:any)=>t && t != 'name').join(', ');
  }

  getWeaponEffects(index : number, ranged: boolean) : string {
    return [this.getWeaponProp(index, ranged, 'offensiveSkills'), this.getWeaponProp(index, ranged, 'defensiveSkills')]
    .filter(e=>e).join(', ');
  }

  getWeaponDamage(index: number, ranged: boolean) : string {
    let weapon = this.getWeapon(index, ranged);
    if(!weapon) return "";
    if(weapon.damage)
      return weapon.damage;
    return [weapon.oneHanded, weapon.twoHanded, weapon.shield, weapon.unarmed, weapon.ranged].filter(d=>d).join(" / ");
  }

  getEquipmentInfo() : string {
    if(!this.character.equipment.equipmentAndArmor)
      return this.generateEquipmentInfo();
    return this.character.equipment.equipmentAndArmor;
  }

  generateEquipmentInfo(): string {
    let eq = this.character.equipment;
    return [
      [Object.assign({loc:"Head"},eq.head), 
      Object.assign({loc:"Chest"},eq.chest), 
      Object.assign({loc:"Abdoment"},eq.abdoment), 
      Object.assign({loc:"Left Arm"},eq.leftArm), 
      Object.assign({loc:"Right Arm"},eq.rightArm), 
      Object.assign({loc:"Left Leg"},eq.leftLeg), 
      Object.assign({loc:"Right Leg"},eq.rightLeg)]
      .filter(e=>e && e.type).map(e=>`${e.loc}-${e.material}-${e.type}`).join(', '), 
      eq.weapons.map(w=>(w.quantity? w.quantity : "1")+"x "+w.name).join(', '),
      eq.items.map(i=>(i.quantity? i.quantity : "1")+"x "+i.name).join(', ')
    ].join('\n');
  }

  setEquipmentInfo(event: any) {
    this.character.equipment.equipmentAndArmor = event.target.value;
  }

  getEquipmentEnc() : number {
    if(this.character.equipment.equipmentEnc == undefined)
      return getButArmor(this.character, 'enc');
    return this.character.equipment.equipmentEnc;
  }

  setEquipmentEnc(event : any) {
    let value = event.target.value;
    if(value == undefined || value=='' || isNaN(value))
      value = undefined;
    this.character.equipment.equipmentEnc = value;
  }

  getArmourEnc() : number {
    if(this.character.equipment.armourEnc == undefined)
      return getOnlyArmor(this.character, 'enc');
    return this.character.equipment.armourEnc;
  }

  setArmourEnc(event : any) {
    let value = event.target.value;
    if(value == undefined || value=='' || isNaN(value))
      value = undefined;
    this.character.equipment.armourEnc = value;
  }

  getTotalEnc() : number {
    if(this.character.equipment.totalEnc == undefined)
      return getTotalFromItems(this.character, 'enc');
    return this.character.equipment.totalEnc;
  }

  setTotalEnc(event : any) {
    let value = event.target.value;
    if(value == undefined || value=='' || isNaN(value))
      value = undefined;
    this.character.equipment.totalEnc = value;
  }

  getArmorPenalty() : number {
    if(this.character.equipment.armorPenalty == undefined)
      return this.character.equipment.armourEnc == undefined?
        getOnlyArmor(this.character, 'enc')/5 :
        this.character.equipment.armourEnc / 5;
    return this.character.equipment.armorPenalty;
  }

  setArmorPenalty(event : any) {
    let value = event.target.value;
    if(value == undefined || value=='' || isNaN(value))
      value = undefined;
    this.character.equipment.armorPenalty = value;
  }

  getCultInformation() : string {
    if(!this.character.cultOverall)
      return this.generateCultInformation();
    return this.character.cultOverall;
  }

  generateCultInformation(): string {
    return [
      Object.assign({cult:'Brotherhood'},this.character.brotherhood),
      Object.assign({cult:'Animist Cult'},this.character.animistCult),
      Object.assign({cult:'Theism Cult'},this.character.theistCult),
      Object.assign({cult:'Sorcery Order'},this.character.sorceryOrder),
      Object.assign({cult:'Mystical Order'},this.character.mysticalOrder),
    ].filter(c=>c.name).map(c=>[c.cult, c.name, c.level].join('\n')).join('\n');
  }

  setCultInformation(event: any) {
    this.character.cultOverall = event.target.value;
  }

  getReligion() : string {
    if(!this.character.religion)
      return this.generateReligion();
    return this.character.religion;
  }

  generateReligion(): string {
    return this.character.theistCult.name? this.character.theistCult.name : "";
  }

  setReligion(event: any) {
    this.character.religion = event.target.value;
  }

  getAbilities() : string {
    if(!this.character.magic.abilities)
      return this.generateAbilities();
    return this.character.magic.abilities;
  }

  generateAbilities(): string {
    let magic = [
      this.getMapOrNull(this.character.magic.folk,"Folk Spells"),
      this.getMapOrNull(this.character.magic.sorcery,"Sorcery"),
      this.getMapOrNull(this.character.magic.miracles,"Miracles"),
      this.character.magic.spirits?("Spirits\n"+this.character.magic.spirits) : undefined
    ].concat(this.character.magic.path? [
      this.getStringMapOrNull(this.character.magic.path.augmentations,"Augmentations"),
      this.getMapOrNull(this.character.magic.path.invocations,"Invocations"),
      this.getMapOrNull(this.character.magic.path.enhancements,"Enhancements")
    ]: []).filter(s=>s && s.length > 0).join("\n");
    return magic;
  }

  getMapOrNull(list : Spell[], title : string) : string | undefined {
    return list && list.length ? (title+":\n"+list.map(s=>s.name).join(', ')) : undefined;
  }

  getStringMapOrNull(list : string[], title : string) : string | undefined {
    return list && list.length ? (title+":\n"+list.join(', ')) : undefined;
  }

  setAbilities(event: any) {
    this.character.magic.abilities = event.target.value;
  }

}
