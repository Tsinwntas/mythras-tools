import { hydrateCharacter } from './character-format';
import { getCurrentHp, setCurrentHp, getMaximumHp, HIT_LOCATIONS } from './hit-points';

describe('Manual current hit points', () => {
  const legacy = () => ({skills:{con:10,siz:10}, hp:{head:{extraBonus:-2},chest:{extraBonus:0},leftArm:{extraBonus:-3},rightArm:{extraBonus:null}}});
  it('leaves all current fields absent while calculating maximums', () => {
    const character=hydrateCharacter({skills:{con:10,siz:10}});
    for (const {key} of HIT_LOCATIONS) expect(getCurrentHp(character,key)).toBe('');
    expect(getMaximumHp(character,'head')).toBe(4);
    expect(character.currentHitPoints).toBeUndefined();
  });
  it('restores explicit legacy HP edits, including zero and an unchanged maximum', () => {
    const character=hydrateCharacter(legacy());
    expect(getCurrentHp(character,'head')).toBe(2);
    expect(getCurrentHp(character,'chest')).toBe(6);
    expect(getCurrentHp(character,'leftArm')).toBe(0);
    expect(getCurrentHp(character,'rightArm')).toBe('');
    expect(getMaximumHp(character,'head')).toBe(4);
    character.skills.con=30;
    expect(getCurrentHp(character,'head')).toBe(2);
  });
  it('preserves manually entered zero, negative HP and cleared values across reload without restoring old values', () => {
    const character=hydrateCharacter(legacy());
    setCurrentHp(character,'head','');setCurrentHp(character,'chest',0);setCurrentHp(character,'leftLeg',-2);
    const reloaded=hydrateCharacter(JSON.parse(JSON.stringify(character)));
    expect(getCurrentHp(reloaded,'head')).toBe('');
    expect(getCurrentHp(reloaded,'chest')).toBe(0);
    expect(getCurrentHp(reloaded,'leftLeg')).toBe(-2);
    expect(reloaded.hp.head.extraBonus).toBe(-2);
    setCurrentHp(reloaded,'chest',null);
    expect(getCurrentHp(reloaded,'chest')).toBe('');
  });
  it('keeps existing manual values and unknown save fields while restoring old HP edits', () => {
    const character=hydrateCharacter({...legacy(), currentHitPoints:{head:1,chest:null}, extension:{keep:'unchanged'}});
    expect(getCurrentHp(character,'head')).toBe(1);
    expect(getCurrentHp(character,'chest')).toBe('');
    expect((character as any).extension.keep).toBe('unchanged');
  });
});
