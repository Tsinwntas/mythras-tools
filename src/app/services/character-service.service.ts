import { Injectable } from '@angular/core';
import { Character } from '../model/character';
import { CharacterSkills } from '../model/character-skills';
import { Skill } from '../model/skill';
import { orZero } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }
}

export function initSkills (skills : CharacterSkills){
  skills.skills = [];
  
  //STANDARD SKILLS
  skills.skills.push(new Skill("Athletics", false, "str", "dex"));
  skills.skills.push(new Skill("Boating", false, "str", "con"));
  skills.skills.push(new Skill("Brawn", false, "str", "siz"));
  skills.skills.push(new Skill("Conceal", false, "dex", "pow"));
  skills.skills.push(new Skill("Customs", false, "int").setOperations({"add":40,"multiply":2}));
  skills.skills.push(new Skill("Dance", false, "dex", "cha"));
  skills.skills.push(new Skill("Deceit", false, "int", "cha"));
  skills.skills.push(new Skill("Drive", false, "dex", "pow"));
  skills.skills.push(new Skill("Endurance", false, "con").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Evade", false, "dex").setOperations({"multiply":2}));
  skills.skills.push(new Skill("First Aid", false, "dex", "int"));
  skills.skills.push(new Skill("Influence", false, "cha").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Insight", false, "int", "pow"));
  skills.skills.push(new Skill("Locale", false, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Native Tongue", false, "int", "cha").setOperations({"add":40}));
  skills.skills.push(new Skill("Perception", false, "int", "pow"));
  skills.skills.push(new Skill("Ride", false, "dex", "pow"));
  skills.skills.push(new Skill("Sing", false, "pow", "cha"));
  skills.skills.push(new Skill("Stealth", false, "dex", "int"));
  skills.skills.push(new Skill("Swim", false, "str", "con"));
  skills.skills.push(new Skill("Unarmed", false, "str", "dex"));
  skills.skills.push(new Skill("Willpower", false, "pow").setOperations({"multiply":2}));

  //PROFESSIONAL SKILLS
  skills.skills.push(new Skill("Art", true, "pow", "cha"));
  skills.skills.push(new Skill("Binding", true, "pow", "cha"));
  skills.skills.push(new Skill("Bureaucracy", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Commerce", true, "int", "cha"));
  skills.skills.push(new Skill("Courtesy", true, "int", "cha"));
  skills.skills.push(new Skill("Craft", true, "dex", "int"));
  skills.skills.push(new Skill("Culture", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Devotion", true, "pow", "cha"));
  skills.skills.push(new Skill("Disguise", true, "int", "cha"));
  skills.skills.push(new Skill("Engineering", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Exhort", true, "int", "cha"));
  skills.skills.push(new Skill("Folk Magic", true, "pow", "cha"));
  skills.skills.push(new Skill("Gambling", true, "int", "pow"));
  skills.skills.push(new Skill("Healing", true, "int", "pow"));
  skills.skills.push(new Skill("Invocation", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Language", true, "int", "cha"));
  skills.skills.push(new Skill("Literacy", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Lockpicking", true, "dex").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Lore", true, "int").setOperations({"multiply":2}));
  skills.skills.push(new Skill("Mechanisms", true, "dex", "int"));
  skills.skills.push(new Skill("Meditation", true, "int", "con"));
  skills.skills.push(new Skill("Musicianship", true, "dex", "cha"));
  skills.skills.push(new Skill("Mysticism", true, "pow", "con"));
  skills.skills.push(new Skill("Navigation", true, "int", "pow"));
  skills.skills.push(new Skill("Oratory", true, "pow", "cha"));
  skills.skills.push(new Skill("Seamanship", true, "int", "con"));
  skills.skills.push(new Skill("Seduction", true, "int", "cha"));
  skills.skills.push(new Skill("Shaping", true, "int", "pow"));
  skills.skills.push(new Skill("Sleight", true, "dex", "cha"));
  skills.skills.push(new Skill("Streetwise", true, "pow", "cha"));
  skills.skills.push(new Skill("Survival", true, "con", "pow"));
  skills.skills.push(new Skill("Teach", true, "int", "cha"));
  skills.skills.push(new Skill("Track", true, "int", "con"));
  skills.skills.push(new Skill("Trance", true, "pow", "con"));

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
  if(!hasSkills(character, skill.base))
    return 0;
  return getSkillBase(character, skill)
  + orZero(skill.cultureBonus)
  + orZero(skill.extraBonus);
}

export function getSkillBase(character: Character, skill : Skill) : number {
  if(!hasSkills(character, skill.base))
    return 0;
  let total = 0;

  for(let i = 0; i < skill.base.length; i++) {
    total += (character.skills as any)[skill.base[i]];
  }

  if(skill.multiply)
  total *= skill.multiply;

  if(skill.divide)
  total = Math.ceil(total/skill.divide);

  if(skill.add)
  total += skill.add;

  return total;
}

export function getDamageModifier(character: Character) : string
{
  let dice = getSkillBase(character, character.skills.damage);
  if(dice == 0)
    return '0';
  dice = (dice  - 5) * 2;
  if(dice < 0)
    return '-1d'+Math.abs(dice);
  return '+1d'+dice;
}

function hasSkills(character: Character, attr: string[]) {
  if(!character || !character.skills)
    return false;
  for(let a of attr){
    if((character.skills as any)[a] == undefined)
      return false;
  }
  return true;
}

export function getStandardCulturalSkills(character: Character) : Skill[] {
  if(!character.culture)
    return [];
  switch(character.culture) {
    case "Barbarian": return getIncludedSkills(character, 
      'Athletics',
      'Brawn',
      'Endurance',
      'First Aid',
      'Locale',
      'Perception',
      'Boating',
      'Ride'
    );
    case 'Civilized': return getIncludedSkills(character, 
      'Conceal',
      'Deceit',
      'Drive',
      'Influence',
      'Insight',
      'Locale',
      'Willpower'
    );
    case 'Nomadic': return getIncludedSkills(character, 
      'Endurance',
      'First Aid',
      'Locale',
      'Perception',
      'Stealth',
      'Boating ',
      'Swim',
      'Drive ',
      'Ride',
    );
    case 'Primitive': return getIncludedSkills(character,
      'Brawn',
      'Endurance',
      'Evade',
      'Locale',
      'Perception',
      'Stealth',
      'Athletics',
      'Boating',
      'Swim',
    );
  }
  return [];
}

export function getProfessionalCulturalSkills(character: Character) : Skill[] {
  if(!character.culture)
    return [];
  switch(character.culture) {
    case "Barbarian": return getIncludedSkills(character, 
      'Craft',
      'Healing',
      'Lore',
      'Musicianship',
      'Navigate',
      'Seamanship',
      'Survival',
      'Track',
    );
    case 'Civilized': return getIncludedSkills(character, 
      'Art',
      'Commerce',
      'Craft',
      'Courtesy',
      'Language',
      'Lore',
      'Musicianship',
      'Streetwise',
    );
    case 'Nomadic': return getIncludedSkills(character, 
      'Craft',
      'Culture',
      'Language',
      'Lore',
      'Musicianship',
      'Navigate',
      'Survival',
      'Track',
    );
    case 'Primitive': return getIncludedSkills(character,
      'Craft',
      'Healing',
      'Lore',
      'Musicianship',
      'Navigate',
      'Survival',
      'Track',
    );
  }
  return [];
}
function getIncludedSkills(character: Character, ...skills : string[]) : Skill[] {
  return character.skills.skills.filter(s=>skills.includes(s.name));
}