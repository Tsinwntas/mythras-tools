import { Character } from '../model/character';
import { Skill } from '../model/skill';

let builtInNames: Set<string>;
export type ProfessionalSkillSelection = 'culture' | 'career' | 'hobby';
function sameSkill(a: Skill | undefined, b: Skill): boolean {
  return !!a && (a === b || (a.name === b.name && JSON.stringify(a.base) === JSON.stringify(b.base)));
}

export function isProfessionalSkillSelected(character: Character, skill: Skill, selection: ProfessionalSkillSelection): boolean {
  const list = selection === 'culture' ? character.skills.extraProfessionalCultureSkills : selection === 'career' ? character.skills.extraProfessionalCareerSkills : [character.skills.hobby];
  return list.some(entry => sameSkill(entry, skill));
}

export function removeProfessionalSkillSelection(character: Character, skill: Skill, selection: ProfessionalSkillSelection): void {
  if (!isProfessionalSkillSelected(character, skill, selection)) return;
  // A definition present only in an older selection must remain available to select again.
  if (skill.professional && !character.skills.skills.some(entry => sameSkill(entry, skill))) character.skills.skills.push(skill);
  if (selection === 'hobby') {
    character.skills.hobby = undefined as any;
    return;
  }
  const list = selection === 'culture' ? character.skills.extraProfessionalCultureSkills : character.skills.extraProfessionalCareerSkills;
  const bonus = selection === 'culture' ? 'cultureBonus' : 'careerBonus';
  for (const entry of [...character.skills.skills, ...character.skills.specialized, ...character.skills.extraProfessionalCultureSkills, ...character.skills.extraProfessionalCareerSkills, ...(character.skills.hobby ? [character.skills.hobby] : [])]) {
    if (sameSkill(entry, skill)) entry[bonus] = 0;
  }
  for (let index = list.length - 1; index >= 0; index--) if (sameSkill(list[index], skill)) list.splice(index, 1);
}
export function isCustomSkill(skill: Skill): boolean {
  builtInNames ||= new Set(new Character().skills.skills.map(s => s.name));
  return !!skill && skill.professional && (skill.custom === true || !builtInNames.has(skill.name));
}

function references(character: Character, skill: Skill): Skill[] {
  const skills = character.skills;
  const all = [...skills.skills, ...skills.specialized, ...skills.extraProfessionalCultureSkills, ...skills.extraProfessionalCareerSkills, ...(skills.hobby ? [skills.hobby] : [])];
  return [...new Set(all.filter(s => s === skill || (isCustomSkill(s) && s.name === skill.name && JSON.stringify(s.base) === JSON.stringify(skill.base))))];
}

export function editCustomSkill(character: Character, skill: Skill, edited: Skill): void {
  for (const target of references(character, skill)) {
    // Editing the definition must never replace allocations or unknown save fields.
    Object.assign(target, {name:edited.name.trim() || 'Unnamed skill', base:[...edited.base], multiply:edited.multiply, divide:edited.divide, add:edited.add, custom:true});
  }
}

export function deleteCustomSkill(character: Character, skill: Skill): void {
  const targets = new Set(references(character, skill));
  for (const list of [character.skills.skills, character.skills.specialized, character.skills.extraProfessionalCultureSkills, character.skills.extraProfessionalCareerSkills]) {
    for (let index = list.length - 1; index >= 0; index--) if (targets.has(list[index])) list.splice(index, 1);
  }
  if (targets.has(character.skills.hobby)) character.skills.hobby = undefined as any;
}
