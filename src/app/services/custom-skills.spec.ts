import { hydrateCharacter } from './character-format';
import { isCustomSkill, editCustomSkill, deleteCustomSkill, removeProfessionalSkillSelection, isProfessionalSkillSelected } from './custom-skills';
import { Skill } from '../model/skill';

describe('Custom skill management', () => {
  const custom=()=>({name:'Skill Name',professional:true,base:['str','dex'],cultureBonus:10,careerBonus:7,extraBonus:15,extension:{notes:'keep'}});
  it('recognizes existing custom skills without marking built-in skills editable', () => {
    const character=hydrateCharacter({name:'Legacy',skills:{skills:[custom()]}});
    expect(isCustomSkill(character.skills.skills[0])).toBeTrue();
    expect(isCustomSkill(character.skills.skills.find(s=>s.name==='Healing')!)).toBeFalse();
    expect(isCustomSkill(new Skill('Sword fighting',false,'str','dex'))).toBeFalse();
  });
  it('updates old duplicated references while preserving each allocation and unknown field', () => {
    const character=hydrateCharacter({name:'Legacy',skills:{skills:[custom()],extraProfessionalCultureSkills:[{...custom(),cultureBonus:12}],extraProfessionalCareerSkills:[{...custom(),careerBonus:9}],hobby:{...custom(),extraBonus:21}}});
    const skill=character.skills.skills[0];
    editCustomSkill(character,skill,Object.assign(new Skill('Dream weaving',true,'int','pow'),{multiply:2,add:3}));
    expect(skill.name).toBe('Dream weaving');expect(skill.cultureBonus).toBe(10);
    expect(character.skills.extraProfessionalCultureSkills[0].name).toBe('Dream weaving');
    expect(character.skills.extraProfessionalCultureSkills[0].cultureBonus).toBe(12);
    expect(character.skills.extraProfessionalCareerSkills[0].careerBonus).toBe(9);
    expect(character.skills.hobby.extraBonus).toBe(21);
    expect((skill as any).extension.notes).toBe('keep');
  });
  it('deletes a custom skill from every selection without removing built-in skills', () => {
    const character=hydrateCharacter({name:'Legacy',skills:{skills:[custom()],specialized:[{...custom()}],extraProfessionalCultureSkills:[{...custom()}],extraProfessionalCareerSkills:[{...custom()}],hobby:{...custom()}}});
    deleteCustomSkill(character,character.skills.skills[0]);
    expect(character.skills.skills.some(s=>s.name==='Skill Name')).toBeFalse();
    expect(character.skills.specialized).toEqual([]);expect(character.skills.extraProfessionalCultureSkills).toEqual([]);expect(character.skills.extraProfessionalCareerSkills).toEqual([]);expect(character.skills.hobby).toBeUndefined();
    expect(character.skills.skills.some(s=>s.name==='Healing')).toBeTrue();
    const reloaded=hydrateCharacter(JSON.parse(JSON.stringify(character)));
    expect(reloaded.skills.skills.some(s=>s.name==='Skill Name')).toBeFalse();
  });
  it('removes only the culture selection and culture points while retaining the definition and other allocations', () => {
    const character=hydrateCharacter({skills:{skills:[custom()],extraProfessionalCultureSkills:[{...custom()}],extraProfessionalCareerSkills:[{...custom()}],hobby:{...custom()}}});
    const skill=character.skills.skills[0];
    removeProfessionalSkillSelection(character,skill,'culture');
    expect(isProfessionalSkillSelected(character,skill,'culture')).toBeFalse();
    expect(character.skills.skills).toContain(skill);
    expect(skill.cultureBonus).toBe(0);expect(skill.careerBonus).toBe(7);expect(skill.extraBonus).toBe(15);
    expect(character.skills.extraProfessionalCareerSkills[0].cultureBonus).toBe(0);
    expect(character.skills.extraProfessionalCareerSkills[0].careerBonus).toBe(7);
    expect(character.skills.hobby.name).toBe('Skill Name');
    const reloaded=hydrateCharacter(JSON.parse(JSON.stringify(character)));
    expect(reloaded.skills.extraProfessionalCultureSkills).toEqual([]);
    expect(reloaded.skills.skills.some(s=>s.name==='Skill Name')).toBeTrue();
  });
  it('removes a career selection without changing culture points and supports deselecting built-in skills', () => {
    const character=hydrateCharacter({skills:{skills:[custom()],extraProfessionalCareerSkills:[{...custom()}]}});
    const skill=character.skills.skills[0];
    removeProfessionalSkillSelection(character,skill,'career');
    expect(skill.cultureBonus).toBe(10);expect(skill.careerBonus).toBe(0);
    expect(character.skills.extraProfessionalCareerSkills).toEqual([]);
    const healing=character.skills.skills.find(s=>s.name==='Healing')!;
    character.skills.extraProfessionalCultureSkills.push(healing);healing.cultureBonus=12;
    removeProfessionalSkillSelection(character,healing,'culture');
    expect(character.skills.skills).toContain(healing);expect(healing.cultureBonus).toBe(0);
  });
  it('retains legacy definitions stored only in a selection and retains bonus points when removing a hobby', () => {
    const character=hydrateCharacter({skills:{extraProfessionalCultureSkills:[custom()],hobby:{...custom()}}});
    const skill=character.skills.extraProfessionalCultureSkills[0];
    removeProfessionalSkillSelection(character,skill,'culture');
    expect(character.skills.skills.some(s=>s.name==='Skill Name')).toBeTrue();
    removeProfessionalSkillSelection(character,character.skills.hobby,'hobby');
    expect(character.skills.hobby).toBeUndefined();
    expect(character.skills.skills.find(s=>s.name==='Skill Name')!.extraBonus).toBe(15);
  });
});
