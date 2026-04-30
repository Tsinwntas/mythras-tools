import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { Character } from 'src/app/model/character';
import { Skill } from 'src/app/model/skill';
import { CharacterPassions } from 'src/app/model/character-passions';
import { Spell } from 'src/app/model/spell';
import { getAllCombatStyles, getButArmor, getDamageModifier, getMoneyAfterClass, getOnlyArmor, getSkillBase, getSkillTotal, getTotalFromItems } from 'src/app/services/character-service.service';
import { orZero } from 'src/app/services/common.service';
import { Passions } from 'src/app/services/passions.service';
import { SpecialEffectsService } from 'src/app/services/special-effects.service';
import {
  AppStorageService,
  DebouncedSaveHandle,
} from 'src/app/services/app-storage.service';

type ViewerSection =
  | 'overview'
  | 'attributes'
  | 'skills'
  | 'combat'
  | 'weapons-armor'
  | 'notes';

@Component({
  selector: 'app-responsive-character-viewer',
  templateUrl: './responsive-character-viewer.component.html',
  styleUrls: ['./responsive-character-viewer.component.scss'],
})
export class ResponsiveCharacterViewerComponent implements OnInit, OnDestroy {
  private readonly storage = inject(AppStorageService);
  private readonly effects = inject(SpecialEffectsService);
  private saveHandle!: DebouncedSaveHandle;

  character: Character | null = null;
  activeSection: ViewerSection = 'overview';

  readonly sections: { key: ViewerSection; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'attributes', label: 'Attributes' },
    { key: 'skills', label: 'Skills' },
    { key: 'combat', label: 'Combat' },
    { key: 'weapons-armor', label: 'Weapons & Armor' },
    { key: 'notes', label: 'Notes' },
  ];
  readonly passionObjects = Passions.map((p) => p.objectOfPassion);
  private traitsRecord: Record<string, any> = {};

  readonly characteristicRows: {
    label: string;
    orig: () => number | string;
    max: () => number | string;
    curr: () => number | string;
  }[] = [
    { label: 'STR', orig: () => this.character?.skills?.str ?? '', max: () => '-', curr: () => this.character?.skills?.str ?? '' },
    { label: 'CON', orig: () => this.character?.skills?.con ?? '', max: () => '-', curr: () => this.character?.skills?.con ?? '' },
    { label: 'SIZ', orig: () => this.character?.skills?.siz ?? '', max: () => '-', curr: () => this.character?.skills?.siz ?? '' },
    { label: 'DEX', orig: () => this.character?.skills?.dex ?? '', max: () => '-', curr: () => this.character?.skills?.dex ?? '' },
    { label: 'INT', orig: () => this.character?.skills?.int ?? '', max: () => '-', curr: () => this.character?.skills?.int ?? '' },
    { label: 'POW', orig: () => this.character?.skills?.pow ?? '', max: () => '-', curr: () => this.character?.skills?.pow ?? '' },
    { label: 'CHA', orig: () => this.character?.skills?.cha ?? '', max: () => '-', curr: () => this.character?.skills?.cha ?? '' },
  ];

  ngOnInit(): void {
    this.saveHandle = this.storage.createDebouncedSave(
      () => this.persistCharacter(),
      300
    );
    this.character = Object.assign(
      new Character(),
      JSON.parse(this.storage.getRaw('view-character') || '{}')
    );
  }

  setSection(section: ViewerSection): void {
    this.activeSection = section;
  }

  setNumberValue(
    obj: Record<string, any> | null | undefined,
    key: string,
    event: any
  ): void {
    if (!obj) {
      return;
    }
    const raw = event?.target?.value;
    const parsed = parseInt(raw, 10);
    obj[key] = Number.isNaN(parsed) ? 0 : parsed;
  }

  setCharacterNumber(field: string, event: any): void {
    this.setNumberValue(this.character as any, field, event);
  }

  setSkillCharacteristic(field: string, event: any): void {
    this.setNumberValue(this.character?.skills as any, field, event);
  }

  getSkill(skill: Skill | undefined): number | string {
    if (!this.character || !skill) {
      return '';
    }
    if (skill.name === 'Damage Modifier') {
      return getDamageModifier(this.character);
    }
    return getSkillTotal(this.character, skill);
  }

  getSkillBaseValue(skill: Skill | undefined): number | string {
    if (!this.character || !skill) {
      return '';
    }
    return getSkillBase(this.character, skill);
  }

  setSkill(skill: Skill | undefined, value: any): void {
    if (!skill) {
      return;
    }
    skill.extraBonus =
      parseInt(value.target.value, 10) -
      parseInt(this.getSkill(skill).toString(), 10) +
      orZero(skill.extraBonus);
  }

  getHpTotal(skill: Skill | undefined): number | string {
    if (!skill) {
      return '';
    }
    return parseInt(this.getSkill(skill).toString(), 10) - orZero(skill.extraBonus);
  }

  getFixedSkill(skill: string): number | string {
    const actual = this.getActualSkill(skill);
    if (!actual) {
      return '';
    }
    return this.getSkill(actual);
  }

  setFixedSkill(skill: string, value: any): void {
    const actual = this.getActualSkill(skill);
    if (!actual) {
      return;
    }
    actual.extraBonus =
      parseInt(value.target.value, 10) -
      parseInt(this.getSkill(actual).toString(), 10) +
      orZero(actual.extraBonus);
  }

  getActualSkill(skill: string): Skill | undefined {
    if (!this.character) {
      return undefined;
    }
    return this.character.skills.skills
      .concat(this.character.skills.combatstyles)
      .concat(this.character.skills.specialized)
      .concat([this.character.skills.hobby])
      .find((s) => s && s.name === skill);
  }

  getOrCreateMoney(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.moneyOverall) {
      this.generateMoney();
    }
    return this.character.moneyOverall;
  }

  setMoney(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.moneyOverall = event.target.value;
  }

  generateMoney(): void {
    if (!this.character) {
      return;
    }
    const money =
      getMoneyAfterClass(this.character) -
      getTotalFromItems(this.character, 'cost');
    const social = this.character.socialClass;
    this.character.moneyOverall =
      `Money: ${Math.floor(money)} S, ${Math.floor(
        (money - Math.floor(money)) * 100
      )} C\n\n${social ? social.resources : ''}`.trim() + '\n';
  }

  getAthletics(): number {
    return orZero(this.getFixedSkill('Athletics') as any);
  }

  getSwimSkill(): number {
    return orZero(this.getFixedSkill('Swim') as any);
  }

  getHeight(): number {
    const height = this.character?.height;
    if (!height) return 0;
    if (height < 10) return height;
    return height / 100;
  }

  getRun(): number {
    const mr = parseInt(this.character?.movementRate as any, 10) || 0;
    return (mr + Math.floor(this.getAthletics() / 25) * 0.5) * 3;
  }

  getSprint(): number {
    const mr = parseInt(this.character?.movementRate as any, 10) || 0;
    return (mr + Math.floor(this.getAthletics() / 25) * 0.5) * 5;
  }

  getHorizontal(): number {
    return this.getHeight() * 2 + Math.floor(this.getAthletics() / 20);
  }

  getVertical(): number {
    return this.getHeight() * 2 + Math.floor(this.getAthletics() / 20) * 0.2;
  }

  getSwim(): number {
    const mr = parseInt(this.character?.movementRate as any, 10) || 0;
    return mr + Math.floor(this.getSwimSkill() / 20);
  }

  getStandardSkills(): Skill[] {
    if (!this.character) {
      return [];
    }
    return this.character.skills.skills.filter((s) => s && !s.professional);
  }

  getProffSkills(skill?: string): Skill[] {
    if (!this.character) {
      return [];
    }
    return this.character.skills.skills
      .concat(this.character.skills.specialized)
      .concat([this.character.skills.hobby])
      .filter(
        (s) =>
          s &&
          s.professional &&
          ((!skill && !s.name.includes('Language')) ||
            (skill && s.name.includes(skill) && s.name !== skill))
      );
  }

  getActualProfSkill(index: number, skill?: string): Skill | undefined {
    return this.getProffSkills(skill).filter(
      (s) => s.force || !(!s.careerBonus && !s.cultureBonus && !s.extraBonus)
    )[index];
  }

  getProfSkillName(index: number, skill?: string): string {
    const actual = this.getActualProfSkill(index, skill);
    return actual ? actual.name : '';
  }

  getProfBaseSkill(index: number, skill?: string): number | string {
    const actual = this.getActualProfSkill(index, skill);
    if (!actual || !this.character) {
      return '';
    }
    return getSkillBase(this.character, actual);
  }

  getProfSkill(index: number, skill?: string): number | string {
    const actual = this.getActualProfSkill(index, skill);
    if (!actual) {
      return '';
    }
    return this.getSkill(actual);
  }

  setProfSkill(value: any, index: number, skill?: string): void {
    const actual = this.getActualProfSkill(index, skill);
    if (!actual) {
      return;
    }
    actual.extraBonus =
      parseInt(value.target.value, 10) -
      parseInt(this.getSkill(actual).toString(), 10) +
      orZero(actual.extraBonus);
  }

  setProfSkillNameByValue(value: string, index: number, skill?: string): void {
    this.setProfSkillName({ target: { value } }, index, skill);
  }

  setProfSkillName(value: any, index: number, skill?: string): void {
    const actual = this.getActualProfSkill(index, skill);
    const incoming = (value?.target?.value || '').trim();
    if (!incoming && actual && actual.force) {
      actual.force = false;
      return;
    }

    const found = this.getActualSkill(incoming);
    if (found && !found.careerBonus && !found.cultureBonus && !found.extraBonus) {
      found.force = true;
    }
  }

  getProfessionalSkillOptions(skill?: string): string[] {
    return this.getProffSkills(skill).map((s) => s.name);
  }

  getDevotionSkill(): Skill | undefined {
    if (!this.character) {
      return undefined;
    }
    return this.character.skills.skills
      .concat(this.character.skills.hobby)
      .concat(this.character.skills.specialized)
      .filter((s) => s && s.name.includes('Devotion'))
      .sort(
        (a, b) =>
          getSkillTotal(this.character as Character, b) -
          getSkillTotal(this.character as Character, a)
      )[0];
  }

  getDevotion(): number {
    const skill = this.getDevotionSkill();
    if (!skill) {
      return 0;
    }
    return getSkillTotal(this.character as Character, skill);
  }

  setDevotion(value: any): void {
    const skill = this.getDevotionSkill();
    if (!skill) {
      return;
    }
    skill.extraBonus =
      parseInt(value.target.value, 10) -
      parseInt(this.getSkill(skill).toString(), 10) +
      orZero(skill.extraBonus);
  }

  getPassion(index: number): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.passions) {
      this.character.passions = [];
    }
    const passion = this.character.passions[index];
    return passion?.passion || '';
  }

  setPassion(index: number, event: any): void {
    if (!this.character) {
      return;
    }
    if (!this.character.passions[index] && !event.target.value) return;
    if (!this.character.passions[index] && event.target.value)
      this.character.passions[index] = { passion: '', modifierNumber: 0 } as any;
    this.character.passions[index].passion = event.target.value;
  }

  ensurePassion(index: number): CharacterPassions {
    if (!this.character) {
      return {} as CharacterPassions;
    }
    if (!this.character.passions) {
      this.character.passions = [];
    }
    if (!this.character.passions[index]) {
      this.character.passions[index] = new CharacterPassions();
      this.character.passions[index].passion = '';
      this.character.passions[index].modifier = '';
    }
    return this.character.passions[index];
  }

  setPassionObject(index: number, value: string): void {
    const passion = this.ensurePassion(index);
    passion.objectOfPassion = value;
    passion.modifier = this.getPassionModifierText(value);
  }

  getPassionModifierText(objectOfPassion: string | undefined): string {
    if (!objectOfPassion) {
      return '';
    }
    return (
      Passions.find((p) => p.objectOfPassion === objectOfPassion)?.savingPercentage || ''
    );
  }

  getCombatStyles() {
    if (!this.character) {
      return [];
    }
    return getAllCombatStyles(this.character);
  }

  getActiveStyles() {
    return this.getCombatStyles().filter(
      (s: any) => s.force || !(!s.careerBonus && !s.cultureBonus && !s.extraBonus)
    );
  }

  getStyleName(index: number): string {
    const styles = this.getActiveStyles();
    if (styles.length <= index) return '';
    return styles[index].name;
  }

  getStyleWeapons(index: number): string {
    const styles = this.getActiveStyles();
    if (styles.length <= index) return '';
    const weapons = styles[index].weapons;
    return Object.keys(weapons)
      .map((key) => weapons[key].trim())
      .join(', ')
      .replace(/[.]/g, '');
  }

  getStyleTrait(index: number): string {
    const styles = this.getActiveStyles();
    if (styles.length <= index) return '';
    const trait = styles[index].selectedTrait;
    return trait ? trait.name : '';
  }

  getStyleTraitObject(index: number): any | undefined {
    const styles = this.getActiveStyles();
    if (styles.length <= index) return undefined;
    return styles[index].selectedTrait;
  }

  getStyleSource(index: number): string {
    const styles = this.getActiveStyles();
    if (styles.length <= index) return '';
    return styles[index].source || '';
  }

  setStyleNameByValue(value: string, index: number): void {
    this.setStyle({ target: { value } }, index);
  }

  setStyle(value: any, index: number): void {
    const actualStyle = this.getActiveStyles()[index];
    const incoming = (value?.target?.value || '').trim();
    if (!incoming && actualStyle && actualStyle.force) {
      actualStyle.force = false;
      return;
    }

    const foundStyle = this.getCombatStyles().find(
      (style: any) => style.name === incoming
    );
    if (
      foundStyle &&
      !foundStyle.careerBonus &&
      !foundStyle.cultureBonus &&
      !foundStyle.extraBonus
    ) {
      foundStyle.force = true;
    }
  }

  getWeapon(index: number, ranged: boolean): any {
    if (!this.character?.equipment?.weapons) {
      return undefined;
    }
    return this.character.equipment.weapons.filter((w: any) =>
      ranged ? w.ranged : !w.ranged
    )[index];
  }

  getWeaponRows(ranged: boolean): number[] {
    const minimum = ranged ? 2 : 7;
    const length = Math.max(
      minimum,
      this.character?.equipment?.weapons?.filter((w: any) =>
        ranged ? w.ranged : !w.ranged
      )?.length || 0
    );
    return Array.from({ length }, (_, i) => i);
  }

  getWeaponProp(index: number, ranged: boolean, prop: string): any {
    const weapon = this.getWeapon(index, ranged);
    if (!weapon) {
      return '';
    }
    return weapon[prop] ? weapon[prop] : '';
  }

  setWeaponProp(index: number, ranged: boolean, prop: string, event: any): void {
    const weapon = this.getWeapon(index, ranged);
    if (!weapon) {
      return;
    }
    weapon[prop] = event?.target?.value;
  }

  getWeaponTraits(index: number, ranged: boolean): string {
    let traits = this.getWeaponProp(index, ranged, 'traits');
    if (traits === '') {
      traits = [];
    }
    return traits
      .map((t: any) => t.name)
      .filter((t: any) => t && t !== 'name')
      .join(', ');
  }

  getWeaponEffects(index: number, ranged: boolean): string {
    return [
      this.getWeaponProp(index, ranged, 'offensiveSkills'),
      this.getWeaponProp(index, ranged, 'defensiveSkills'),
    ]
      .filter((e) => e)
      .join(', ');
  }

  getWeaponDamage(index: number, ranged: boolean): string {
    const weapon = this.getWeapon(index, ranged);
    if (!weapon) {
      return '';
    }
    if (weapon.damage) {
      return weapon.damage;
    }
    return [
      weapon.oneHanded,
      weapon.twoHanded,
      weapon.shield,
      weapon.unarmed,
      weapon.ranged,
    ]
      .filter((d) => d)
      .join(' / ');
  }

  getEquipmentInfo(): string {
    if (!this.character?.equipment) {
      return '';
    }
    if (!this.character.equipment.equipmentAndArmor) {
      return this.generateEquipmentInfo();
    }
    return this.character.equipment.equipmentAndArmor;
  }

  generateEquipmentInfo(): string {
    if (!this.character?.equipment) {
      return '';
    }
    const eq = this.character.equipment;
    return [
      [
        Object.assign({ loc: 'Head' }, eq.head),
        Object.assign({ loc: 'Chest' }, eq.chest),
        Object.assign({ loc: 'Abdoment' }, eq.abdoment),
        Object.assign({ loc: 'Left Arm' }, eq.leftArm),
        Object.assign({ loc: 'Right Arm' }, eq.rightArm),
        Object.assign({ loc: 'Left Leg' }, eq.leftLeg),
        Object.assign({ loc: 'Right Leg' }, eq.rightLeg),
      ]
        .filter((e: any) => e && e.type)
        .map((e: any) => `${e.loc}-${e.material}-${e.type}`)
        .join(', '),
      (eq.weapons || [])
        .map((w: any) => (w.quantity ? w.quantity : '1') + 'x ' + w.name)
        .join(', '),
      (eq.items || [])
        .map((i: any) => (i.quantity ? i.quantity : '1') + 'x ' + i.name)
        .join(', '),
    ].join('\n');
  }

  setEquipmentInfo(event: any): void {
    if (!this.character?.equipment) {
      return;
    }
    this.character.equipment.equipmentAndArmor = event?.target?.value;
  }

  getEquipmentEnc(): number {
    if (!this.character?.equipment) {
      return 0;
    }
    if (this.character.equipment.equipmentEnc === undefined) {
      return getButArmor(this.character, 'enc');
    }
    return this.character.equipment.equipmentEnc;
  }

  setEquipmentEnc(event: any): void {
    if (!this.character?.equipment) {
      return;
    }
    let value = event?.target?.value;
    if (value === undefined || value === '' || isNaN(value)) {
      value = undefined;
    }
    this.character.equipment.equipmentEnc = value;
  }

  getArmourEnc(): number {
    if (!this.character?.equipment) {
      return 0;
    }
    if (this.character.equipment.armourEnc === undefined) {
      return getOnlyArmor(this.character, 'enc');
    }
    return this.character.equipment.armourEnc;
  }

  setArmourEnc(event: any): void {
    if (!this.character?.equipment) {
      return;
    }
    let value = event?.target?.value;
    if (value === undefined || value === '' || isNaN(value)) {
      value = undefined;
    }
    this.character.equipment.armourEnc = value;
  }

  getTotalEnc(): number {
    if (!this.character?.equipment) {
      return 0;
    }
    if (this.character.equipment.totalEnc === undefined) {
      return getTotalFromItems(this.character, 'enc', true);
    }
    return this.character.equipment.totalEnc;
  }

  setTotalEnc(event: any): void {
    if (!this.character?.equipment) {
      return;
    }
    let value = event?.target?.value;
    if (value === undefined || value === '' || isNaN(value)) {
      value = undefined;
    }
    this.character.equipment.totalEnc = value;
  }

  getArmorPenalty(): number {
    if (!this.character?.equipment) {
      return 0;
    }
    if (this.character.equipment.armorPenalty === undefined) {
      return this.getArmourEnc() / 5;
    }
    return this.character.equipment.armorPenalty;
  }

  setArmorPenalty(event: any): void {
    if (!this.character?.equipment) {
      return;
    }
    let value = event?.target?.value;
    if (value === undefined || value === '' || isNaN(value)) {
      value = undefined;
    }
    this.character.equipment.armorPenalty = value;
  }

  getOrCreateBackground(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.backgroundOverall) {
      this.generateBackground();
    }
    return this.character.backgroundOverall;
  }

  setBackground(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.backgroundOverall = event?.target?.value || '';
  }

  generateBackground(): void {
    if (!this.character) {
      return;
    }
    let background = '';
    if (this.character.backgroundEvents) {
      this.character.backgroundEvents.forEach((b: any) => (background += b.text + '\n'));
    }
    if (this.character.family) {
      background += `${this.character.family.parents}, Siblings: ${
        this.character.family.siblings
      }, Grandparents: ${this.character.family.grands}, Uncles/Aunts: ${
        this.character.family.aunts
      }, Cousins: ${this.character.family.cousins}.\n
Reputation: ${this.character.family.reputation}\n
Connections: ${this.character.family.connections ? this.character.family.connections.trim() : ''}\n

${this.character.family.text}\n\n`;
      if (this.character.background) {
        background += `${this.character.background}\n\n`;
      }
    }
    this.character.backgroundOverall = background.trim();
  }

  getOrCreateContacts(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.contactsOverall) {
      this.generateContacts();
    }
    return this.character.contactsOverall;
  }

  setContacts(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.contactsOverall = event?.target?.value || '';
  }

  generateContacts(): void {
    if (!this.character?.family) {
      return;
    }
    const family = this.character.family;
    this.character.contactsOverall = `Contacts: ${family.contacts}
Allies: ${family.allies}
Rivals: ${family.rivals}
Enemies: ${family.enemies}`.trim();
  }

  getCultInformation(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.cultOverall) {
      return this.generateCultInformation();
    }
    return this.character.cultOverall;
  }

  generateCultInformation(): string {
    if (!this.character) {
      return '';
    }
    return [
      Object.assign({ cult: 'Brotherhood' }, this.character.brotherhood),
      Object.assign({ cult: 'Animist Cult' }, this.character.animistCult),
      Object.assign({ cult: 'Theism Cult' }, this.character.theistCult),
      Object.assign({ cult: 'Sorcery Order' }, this.character.sorceryOrder),
      Object.assign({ cult: 'Mystical Order' }, this.character.mysticalOrder),
    ]
      .filter((c: any) => c.name)
      .map((c: any) => [c.cult, c.name, c.level].join('\n'))
      .join('\n');
  }

  setCultInformation(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.cultOverall = event?.target?.value || '';
  }

  getReligion(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.religion) {
      return this.generateReligion();
    }
    return this.character.religion;
  }

  generateReligion(): string {
    if (!this.character) {
      return '';
    }
    return this.character.theistCult?.name ? this.character.theistCult.name : '';
  }

  setReligion(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.religion = event?.target?.value || '';
  }

  getAbilities(): string {
    if (!this.character?.magic) {
      return '';
    }
    if (!this.character.magic.abilities) {
      return this.generateAbilities();
    }
    return this.character.magic.abilities;
  }

  generateAbilities(): string {
    if (!this.character?.magic) {
      return '';
    }
    const magic = [
      this.getMapOrNull(this.character.magic.folk, 'Folk Spells'),
      this.getMapOrNull(this.character.magic.sorcery, 'Sorcery'),
      this.getMapOrNull(this.character.magic.miracles, 'Miracles'),
      this.character.magic.spirits
        ? 'Spirits\n' + this.character.magic.spirits
        : undefined,
    ]
      .concat(
        this.character.magic.path
          ? [
              this.getStringMapOrNull(
                this.character.magic.path.augmentations as any,
                'Augmentations'
              ),
              this.getMapOrNull(
                this.character.magic.path.invocations as any,
                'Invocations'
              ),
              this.getMapOrNull(
                this.character.magic.path.enhancements as any,
                'Enhancements'
              ),
            ]
          : []
      )
      .filter((s) => s && s.length > 0)
      .join('\n\n');
    return magic;
  }

  getMapOrNull(list: Spell[] | undefined, title: string): string | undefined {
    return list && list.length
      ? title + ':\n' + list.map((s) => s.name).join(', ')
      : undefined;
  }

  getStringMapOrNull(
    list: string[] | undefined,
    title: string
  ): string | undefined {
    return list && list.length ? title + ':\n' + list.join(', ') : undefined;
  }

  setAbilities(event: any): void {
    if (!this.character?.magic) {
      return;
    }
    this.character.magic.abilities = event?.target?.value || '';
  }

  getExtraInformation(): string {
    if (!this.character) {
      return '';
    }
    if (!this.character.extraInformation) {
      return this.generateExtraInformation();
    }
    return this.character.extraInformation;
  }

  generateExtraInformation(): string {
    this.traitsRecord = {};
    this.getCombatStyleTraitsDescription();
    this.getWeaponTraitsDescription();
    this.getWeaponEffectsDescription();
    this.getFolkMagicDescription();
    this.getSorceriesDescription();
    this.getMiracleDescription();
    this.getMysticsDescription();
    return Object.keys(this.traitsRecord)
      .map((k) => this.traitsRecord[k])
      .filter((t: any) => t && t.name !== 'name')
      .sort((a: any, b: any) => a.name.localeCompare(b.name))
      .map((t: any) =>
        [t['name'], t['tags'], t['description']]
          .filter((s) => s && s.length > 0)
          .join('\n')
      )
      .filter((s: any) => s && s.length)
      .join('\n\n')
      .replace(/[<]table.*[/]table[>]/g, '');
  }

  getCombatStyleTraitsDescription(): void {
    const cs: any[] = this.getActiveStyles();
    if (!cs) {
      return;
    }
    cs.map((w: any) => (w.selectedTrait ? [w.selectedTrait] : w.traits))
      .flat()
      .map((t: any) => {
        return { name: t.name, tags: t.trait };
      })
      .forEach((t: any) => this.addTrait(t));
  }

  getWeaponTraitsDescription(): void {
    if (!this.character?.equipment?.weapons) {
      return;
    }
    this.character.equipment.weapons
      .map((w: any) => w.traits)
      .flat()
      .forEach((t: any) => this.addTrait(t));
  }

  getWeaponEffectsDescription(): void {
    if (!this.character?.equipment?.weapons) {
      return;
    }
    this.character.equipment.weapons
      .map((w: any) =>
        ((w.offensiveSkills || '') + ',' + (w.defensiveSkills || ''))
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s)
      )
      .flat()
      .map((e: string) => this.mapEffect(e))
      .forEach((t: any) => this.addTrait(t));
  }

  getFolkMagicDescription(): void {
    if (!this.character?.magic?.folk) {
      return;
    }
    this.character.magic.folk.forEach((t: any) => this.addTrait(t));
  }

  getSorceriesDescription(): void {
    if (!this.character?.magic?.sorcery) {
      return;
    }
    this.character.magic.sorcery.forEach((t: any) => this.addTrait(t));
  }

  getMiracleDescription(): void {
    if (!this.character?.magic?.miracles) {
      return;
    }
    this.character.magic.miracles.forEach((t: any) => this.addTrait(t));
  }

  getMysticsDescription(): void {
    if (!this.character?.magic?.path) {
      return;
    }
    if (this.character.magic.path.enhancements) {
      this.character.magic.path.enhancements.forEach((t: any) => this.addTrait(t));
    }
    if (this.character.magic.path.invocations) {
      this.character.magic.path.invocations.forEach((t: any) => this.addTrait(t));
    }
  }

  mapEffect(effectName: string): any {
    const effect = this.effects.getSpecialEffect(effectName);
    if (!effect) {
      return undefined;
    }
    return {
      name: effect.effect,
      tags: effect.requirement,
      description: effect.traits.join('\n'),
    };
  }

  addTrait(t: any): void {
    if (t && t.name && !this.traitsRecord[t.name]) {
      this.traitsRecord[t.name] = t;
    }
  }

  setExtraInformation(event: any): void {
    if (!this.character) {
      return;
    }
    this.character.extraInformation = event?.target?.value || '';
  }

  @HostListener('document:input')
  @HostListener('document:change')
  @HostListener('document:click')
  onUserInteraction(): void {
    this.saveHandle?.schedule();
  }

  @HostListener('window:beforeunload')
  @HostListener('window:pagehide')
  flushPendingSaves(): void {
    this.saveHandle?.flush();
  }

  ngOnDestroy(): void {
    this.saveHandle?.flush();
    this.saveHandle?.destroy();
  }

  private persistCharacter(): void {
    if (!this.character) {
      return;
    }
    this.storage.setJson('view-character', this.character);
    if (this.character.id) {
      this.storage.setJson(
        this.storage.getCharacterKey(this.character.id),
        this.character
      );
    }
  }
}
