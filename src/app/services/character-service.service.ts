import { CombatStyle } from 'src/app/model/combat-style';
import { Injectable } from '@angular/core';
import { Character } from '../model/character';
import { CharacterSkills } from '../model/character-skills';
import { Skill } from '../model/skill';
import { orZero } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor() {}
}

export function initSkills(skills: CharacterSkills) {
  skills.skills = [];

  //STANDARD SKILLS
  skills.skills.push(new Skill('Athletics', false, 'str', 'dex'));
  skills.skills.push(new Skill('Boating', false, 'str', 'con'));
  skills.skills.push(new Skill('Brawn', false, 'str', 'siz'));
  skills.skills.push(new Skill('Conceal', false, 'dex', 'pow'));
  skills.skills.push(
    new Skill('Customs', false, 'int').setOperations({ add: 40, multiply: 2 })
  );
  skills.skills.push(new Skill('Dance', false, 'dex', 'cha'));
  skills.skills.push(new Skill('Deceit', false, 'int', 'cha'));
  skills.skills.push(new Skill('Drive', false, 'dex', 'pow'));
  skills.skills.push(
    new Skill('Endurance', false, 'con').setOperations({ multiply: 2 })
  );
  skills.skills.push(
    new Skill('Evade', false, 'dex').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('First Aid', false, 'dex', 'int'));
  skills.skills.push(
    new Skill('Influence', false, 'cha').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Insight', false, 'int', 'pow'));
  skills.skills.push(
    new Skill('Locale', false, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(
    new Skill('Native Tongue', false, 'int', 'cha').setOperations({ add: 40 })
  );
  skills.skills.push(new Skill('Perception', false, 'int', 'pow'));
  skills.skills.push(new Skill('Ride', false, 'dex', 'pow'));
  skills.skills.push(new Skill('Sing', false, 'pow', 'cha'));
  skills.skills.push(new Skill('Stealth', false, 'dex', 'int'));
  skills.skills.push(new Skill('Swim', false, 'str', 'con'));
  skills.skills.push(new Skill('Unarmed', false, 'str', 'dex'));
  skills.skills.push(
    new Skill('Willpower', false, 'pow').setOperations({ multiply: 2 })
  );

  //PROFESSIONAL SKILLS
  skills.skills.push(new Skill('Acrobatics', true, 'str', 'dex'));
  skills.skills.push(
    new Skill('Acting', true, 'cha').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Art', true, 'pow', 'cha'));
  skills.skills.push(new Skill('Binding', true, 'pow', 'cha'));
  skills.skills.push(
    new Skill('Bureaucracy', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Commerce', true, 'int', 'cha'));
  skills.skills.push(new Skill('Courtesy', true, 'int', 'cha'));
  skills.skills.push(new Skill('Craft', true, 'dex', 'int'));
  skills.skills.push(
    new Skill('Culture', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Devotion', true, 'pow', 'cha'));
  skills.skills.push(new Skill('Disguise', true, 'int', 'cha'));
  skills.skills.push(
    new Skill('Engineering', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Exhort', true, 'int', 'cha'));
  skills.skills.push(new Skill('Folk Magic', true, 'pow', 'cha'));
  skills.skills.push(new Skill('Gambling', true, 'int', 'pow'));
  skills.skills.push(new Skill('Healing', true, 'int', 'pow'));
  skills.skills.push(
    new Skill('Invocation', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Language', true, 'int', 'cha'));
  skills.skills.push(
    new Skill('Literacy', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(
    new Skill('Lockpicking', true, 'dex').setOperations({ multiply: 2 })
  );
  skills.skills.push(
    new Skill('Lore', true, 'int').setOperations({ multiply: 2 })
  );
  skills.skills.push(new Skill('Mechanisms', true, 'dex', 'int'));
  skills.skills.push(new Skill('Meditation', true, 'int', 'con'));
  skills.skills.push(new Skill('Musicianship', true, 'dex', 'cha'));
  skills.skills.push(new Skill('Mysticism', true, 'pow', 'con'));
  skills.skills.push(new Skill('Navigation', true, 'int', 'pow'));
  skills.skills.push(new Skill('Oratory', true, 'pow', 'cha'));
  skills.skills.push(new Skill('Seamanship', true, 'int', 'con'));
  skills.skills.push(new Skill('Seduction', true, 'int', 'cha'));
  skills.skills.push(new Skill('Shaping', true, 'int', 'pow'));
  skills.skills.push(new Skill('Sleight', true, 'dex', 'cha'));
  skills.skills.push(new Skill('Streetwise', true, 'pow', 'cha'));
  skills.skills.push(new Skill('Survival', true, 'con', 'pow'));
  skills.skills.push(new Skill('Teach', true, 'int', 'cha'));
  skills.skills.push(new Skill('Track', true, 'int', 'con'));
  skills.skills.push(new Skill('Trance', true, 'pow', 'con'));
}

//EXTRACT SKILLS
// console.log(a.map(s=>{
//     debugger
//     let skill = s.match(/^.*[a-z]/g)[0];
//     let split = s.split(/[a-z][ ]/);
//     let base = split[split.length-1]
//     let stats = base.split(/[ ]*[-+×][ ]*/);
//     let ops = base.replace(/[a-zA-Z0-9 ]/g,'').split('');
//     let baseAttrs= [];
//     let baseOps = {};
//     for(let i = 0 ; i < stats.length; i++){
//         if(i==0 && !isNaN(stats[i])){
//             baseOps.add = parseInt(stats[i])
//             continue;
//         } else if(isNaN(stats[i])){
//             baseAttrs.push(stats[i].toLowerCase())
//         } else {
//             if(ops[i-1]=='+')
//                 baseOps.add = parseInt(stats[i])
//             else
//                 baseOps.multiply = parseInt(stats[i])
//         }

//     }
//     return 'skills.skills.push(new Skill("'+skill.trim()+'", true, "'+baseAttrs.join('", "')+'")'+(
//         baseOps.add || baseOps.multiply ? '.setOperations('+JSON.stringify(baseOps)+')' : ''
//     )+');';
//         }).join('\n'))
export function getSkillTotal(character: Character, skill: Skill): number {
  if (!hasSkills(character, skill.base)) return 0;
  const chosenExtra = [...(character.skills.extraProfessionalCultureSkills || []), ...(character.skills.extraProfessionalCareerSkills || [])].some(s => s.name === skill.name);
  if (skill.professional && !skill.force && !skill.cultureBonus && !skill.careerBonus && !skill.extraBonus && skill !== character.skills.hobby && !chosenExtra) return 0;
  return (
    getSkillBase(character, skill) +
    orZero(skill.cultureBonus) +
    orZero(skill.careerBonus) +
    orZero(skill.extraBonus)
  );
}

export function getSkillBase(character: Character, skill: Skill): number {
  if (!hasSkills(character, skill.base)) return 0;
  let total = 0;

  for (let i = 0; i < skill.base.length; i++) {
    if (skill.base[i]) total += Number((character.skills as any)[skill.base[i]]) || 0;
  }

  if (skill.multiply) total *= skill.multiply;

  if (skill.divide) total = Math.ceil(total / skill.divide);

  if (skill.add) total += Number(skill.add) || 0;

  return total;
}

export function getDamageModifier(character: Character): string {
  if (character.damageModifierOverride) return character.damageModifierOverride;
  const sum = Number(character.skills.str || 0) + Number(character.skills.siz || 0);
  if (sum <= 5) return '-1d8';
  if (sum <= 10) return '-1d6';
  if (sum <= 15) return '-1d4';
  if (sum <= 20) return '-1d2';
  if (sum <= 25) return '0';
  const progression = ['1d2','1d4','1d6','1d8','1d10','1d12','2d6','1d8+1d6','2d8','1d10+1d8','2d10'];
  const step = sum <= 50 ? Math.ceil((sum - 25) / 5) : 5 + Math.ceil((sum - 50) / 10);
  const groups = Math.floor((step - 1) / progression.length);
  const dice = progression[(step - 1) % progression.length];
  return '+' + (groups ? `${groups * 2}d10+` : '') + dice;
}

function hasSkills(character: Character, attr: string[]) {
  if (!character || !character.skills || !Array.isArray(attr)) return false;
  for (let a of attr.filter(Boolean)) {
    if ((character.skills as any)[a] == undefined) return false;
  }
  return true;
}

export function getStandardCulturalSkills(character: Character): Skill[] {
  if (!character.culture) return [];
  switch (character.culture) {
    case 'Barbarian':
      return getIncludedSkills(
        character,
        'Athletics',
        'Brawn',
        'Endurance',
        'First Aid',
        'Locale',
        'Perception',
        'Boating',
        'Ride'
      );
    case 'Civilized':
      return getIncludedSkills(
        character,
        'Conceal',
        'Deceit',
        'Drive',
        'Influence',
        'Insight',
        'Locale',
        'Willpower'
      );
    case 'Nomadic':
      return getIncludedSkills(
        character,
        'Endurance',
        'First Aid',
        'Locale',
        'Perception',
        'Stealth',
        'Athletics',
        'Boating',
        'Swim',
        'Drive',
        'Ride'
      );
    case 'Primitive':
      return getIncludedSkills(
        character,
        'Brawn',
        'Endurance',
        'Evade',
        'Locale',
        'Perception',
        'Stealth',
        'Athletics',
        'Boating',
        'Swim'
      );
  }
  return [];
}

export function getProfessionalCulturalSkills(character: Character): Skill[] {
  if (!character.culture) return [];
  switch (character.culture) {
    case 'Barbarian':
      return getIncludedSkills(
        character,
        'Craft',
        'Healing',
        'Lore',
        'Musicianship',
        'Navigation',
        'Seamanship',
        'Survival',
        'Track'
      );
    case 'Civilized':
      return getIncludedSkills(
        character,
        'Art',
        'Commerce',
        'Craft',
        'Courtesy',
        'Language',
        'Lore',
        'Musicianship',
        'Streetwise'
      );
    case 'Nomadic':
      return getIncludedSkills(
        character,
        'Craft',
        'Culture',
        'Language',
        'Lore',
        'Musicianship',
        'Navigation',
        'Survival',
        'Track'
      );
    case 'Primitive':
      return getIncludedSkills(
        character,
        'Craft',
        'Healing',
        'Lore',
        'Musicianship',
        'Navigation',
        'Survival',
        'Track'
      );
  }
  return [];
}
function getIncludedSkills(character: Character, ...skills: string[]): Skill[] {
  return character.skills.skills.filter((s) => skills.includes(s.name));
}

export function getMoneyAfterClass(character: Character) {
  if (!character.socialClass || !character.socialClass.moneyMultiplier)
    return Number(character.startingMoney) || 0;
  return character.socialClass.moneyMultiplier * (Number(character.startingMoney) || 0);
}

export function getTotalFromItems(
  character: Character,
  prop: string,
  halfWorn?: boolean,
  onlyArmor?: boolean
): number {
  return Object.keys(character.equipment)
    .map((k) => {
      if(['equipmentEnc',
        'armourEnc',
        'totalEnc',
        'armorPenalty',
        'equipmentAndArmor'].includes(k))
          return 0;
      if (['weapons', 'items'].includes(k)) {
        if(onlyArmor == true)
          return 0;
        if(!(character.equipment as any)[k].length)
          return 0;
        return (character.equipment as any)[k].reduce(
          (a: any, b: any) =>
            getPropWithQuantity(a, prop) + getPropWithQuantity(b, prop), 0
        );
      }
      if(onlyArmor == false)
        return 0;
      return (
        (orZero((character.equipment as any)[k][prop]) / (halfWorn ? 2 : 1)) *
        ((character.equipment as any)[k].quantity
          ? (character.equipment as any)[k].quantity
          : 1)
      );
    })
    .reduce((a, b) => a + b);
}

export function getOnlyArmor(
  character: Character,
  prop: string) : number {
    return getTotalFromItems(character, prop, true, true);
}

export function getButArmor(
  character: Character,
  prop: string) : number {
    return getTotalFromItems(character, prop, true, false);
}

function getPropWithQuantity(item: any, prop: string): number {
  if(typeof item == 'number')
    return item;
  return orZero(item[prop]) * (item.quantity ? item.quantity : 1);
}

export function getAllCombatStyles(character : Character) : CombatStyle[] {
  return [...new Set(character.skills.combatstyles
    .concat(
      character.skills.hobby && isHobbyCombatStyle(character)
        ? [character.skills.hobby as CombatStyle]
        : []
    ))];

}

export function getCombatStyles(character: Character): CombatStyle[] {
  return [...new Set(character.skills.combatstyles
    .filter((style) => style.force || style.cultureBonus || style.careerBonus)
    .concat(
      character.skills.hobby && isHobbyCombatStyle(character)
        ? [character.skills.hobby as CombatStyle]
        : []
    ))];
}

export function isHobbyCombatStyle(character: Character): boolean {
  return (character.skills.hobby as any)['traits'];
}

/** Count a selected skill once even when culture, career and hobby reference it. */
export function getAllCharacterSkills(character: Character): Skill[] {
  const skills = character.skills;
  return [...new Set([...skills.skills, ...skills.specialized, ...skills.combatstyles,
    ...skills.extraProfessionalCultureSkills, ...skills.extraProfessionalCareerSkills,
    ...(skills.hobby ? [skills.hobby] : [])])];
}

export function getAllocationTotal(character: Character, field: 'cultureBonus' | 'careerBonus' | 'extraBonus'): number {
  return getAllCharacterSkills(character).reduce((sum, skill) => sum + orZero(skill[field]), 0);
}
