import { CharacterPdfComponent } from '../character/character-pdf/character-pdf.component';
import { hydrateCharacter } from './character-format';
import { SpecialEffectsService } from './special-effects.service';

describe('Printed magical abilities', () => {
  function sheet() {
    const component = new CharacterPdfComponent(new SpecialEffectsService());
    component.character = hydrateCharacter({name:'Magic test', magic:{
      folk:[{name:'Flame',description:'Folk spell rules.'}],
      sorcery:[{name:'Portal',description:'Sorcery rules.'}],
      miracles:[{name:'Blessing',description:'Miracle rules.'}],
      custom:[{name:'Starborn talent',tags:'Once per session',description:'Custom talent rules.'}],
      spirits:'Lantern spirit: intensity 2',
      path:{augmentations:['Enhance Endurance'],invocations:[{name:'Inner sight',description:'Invocation rules.'}],enhancements:[{name:'Iron skin',description:'Enhancement rules.'}]}
    }});
    return component;
  }

  it('automatically lists every magic source by name in the Abilities box', () => {
    const component=sheet(), summary=component.getAbilities();
    for (const name of ['Flame','Portal','Blessing','Starborn talent','Lantern spirit','Enhance Endurance','Inner sight','Iron skin']) expect(summary).toContain(name);
    expect(summary).not.toContain('Custom talent rules.');
    expect(summary).not.toContain('Custom abilities:');
    expect(summary).not.toContain('Once per session');
  });

  it('includes custom names, tags and descriptions in the generated rules appendix', () => {
    const appendix=sheet().getExtraInformation();
    for (const text of ['Starborn talent','Once per session','Custom talent rules.','Folk spell rules.','Sorcery rules.','Miracle rules.','Invocation rules.','Enhancement rules.']) expect(appendix).toContain(text);
  });

  it('preserves manual Abilities and appendix text exactly without appending or changing saved data', () => {
    const component=sheet();
    component.character.magic.abilities='My own ability summary\n  Keep this spacing.';
    component.character.extraInformation='My own appendix text.';
    const original=JSON.stringify(component.character);
    expect(component.getAbilities()).toBe(component.character.magic.abilities);
    expect(component.getExtraInformation()).toBe('My own appendix text.');
    expect(JSON.stringify(component.character)).toBe(original);
  });

  it('resumes automatic generation after manual box text is cleared', () => {
    const component=sheet();
    component.character.magic.abilities='Manual';
    component.character.extraInformation='Manual appendix';
    component.character.magic.abilities='';
    component.character.extraInformation='';
    expect(component.getAbilities()).toContain('Starborn talent');
    expect(component.getExtraInformation()).toContain('Custom talent rules.');
    expect(component.character.magic.abilities).toBe('');
    expect(component.character.extraInformation).toBe('');
  });

  it('keeps name-only abilities and recorded spell rules in the original Appendix', () => {
    const component=sheet();
    component.character.magic.custom.push({name:'Quiet talent',description:''});
    const appendix=component.getExtraInformation();
    expect(appendix).toContain('Starborn talent\nOnce per session\nCustom talent rules.');
    expect(appendix).toContain('Quiet talent');
    for (const name of ['Flame','Portal','Blessing','Inner sight','Iron skin']) expect(appendix).toContain(name);
  });

  it('keeps all generated box text live without storing it as manual text', () => {
    const component=sheet(), character=component.character;
    character.startingMoney=100;
    character.family.contacts=1;
    character.background='First background';
    const original=JSON.stringify(character);
    expect(component.getOrCreateMoney()).toContain('100 S');
    expect(component.getOrCreateContacts()).toContain('Contacts: 1');
    expect(component.getOrCreateBackground()).toContain('First background');
    component.getAbilities();
    component.getExtraInformation();
    expect(JSON.stringify(character)).toBe(original);
    character.magic.custom.push({name:'Newly learned talent',description:'New talent rules.'});
    character.startingMoney=250;
    character.family.contacts=3;
    character.background='Changed background';
    expect(component.getAbilities()).toContain('Newly learned talent');
    expect(component.getExtraInformation()).toContain('New talent rules.');
    expect(component.getOrCreateMoney()).toContain('250 S');
    expect(component.getOrCreateContacts()).toContain('Contacts: 3');
    expect(component.getOrCreateBackground()).toContain('Changed background');
    expect(character.contactsOverall).toBeFalsy();
  });

  it('preserves manually edited background, contacts and money until explicitly cleared', () => {
    const component=sheet(), character=component.character;
    character.backgroundOverall='Manual background';
    character.contactsOverall='Manual contacts';
    character.moneyOverall='Manual money';
    character.startingMoney=500;
    character.family.contacts=5;
    expect(component.getOrCreateBackground()).toBe('Manual background');
    expect(component.getOrCreateContacts()).toBe('Manual contacts');
    expect(component.getOrCreateMoney()).toBe('Manual money');
    character.contactsOverall='';
    expect(component.getOrCreateContacts()).toContain('Contacts: 5');
    expect(character.contactsOverall).toBe('');
  });
});
