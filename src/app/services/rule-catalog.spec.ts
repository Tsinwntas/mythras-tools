import CombatStyles from '../jsons/combat-styles.json';
import { CombatStyle } from '../model/combat-style';
import { CombatStylesService, getSources } from './combat-styles.service';
import { WeaponService } from './weapon.service';
import { SpecialEffectsService } from './special-effects.service';
import { hydrateCharacter } from './character-format';

describe('Combat catalog text integrity', () => {
  const groups = CombatStyles as any;
  const styles: any[] = Object.values(groups).flatMap((group: any) => Object.values(group));
  const specials = new SpecialEffectsService();
  const knownEffects = new Set(specials.getEffects().map(effect => effect.effect));
  // These are supplemental effects retained from the encyclopedia's sources.
  ['Distract', 'Spoil Spell', 'Strangle', 'Scatter'].forEach(effect => knownEffects.add(effect));

  it('keeps prose, page headings and trait descriptions out of every style effect list', () => {
    expect(styles.length).toBe(716);
    for (const style of styles) {
      for (const field of ['offensive', 'defensive', 'crit-offensive', 'crit-defensive']) {
        for (const effect of (style[field] || '').split(',').map((value: string) => value.trim()).filter(Boolean)) {
          expect(knownEffects.has(effect)).withContext(`${field}: ${effect}`).toBeTrue();
        }
      }
    }
  });

  it('recovers the Skirmisher background, source and traits split across OCR columns', () => {
    const style = new CombatStyle('Babylonian Skirmisher', groups.Babylon['Babylonian Skirmisher']);
    expect(style.source).toBe('Design Mechanism: Mythic Babylon');
    expect(style.background).toContain('Skirmishers are usually conscripts');
    expect(style.traits.map(trait => trait.name)).toEqual(['Skirmisher', 'Cautious Fighter']);
    expect(style.campaignSpecific).toContain('25 points');
  });

  it('recovers Prize Fighter traits and separates ordinary and critical defences', () => {
    const style = groups['Monster Island']['Prize Fighter'];
    expect(style.traits.map((trait: any) => trait.name)).toContain('Chokehold');
    expect(groups.Babylon['Babylonian Charioteer'].traits.map((trait: any) => trait.name)).toContain('Defensive Minded');
    const unarmed = groups.Standard.Unarmed;
    expect(unarmed.defensive).toMatch(/^Arise,/);
    expect(unarmed['crit-defensive']).toMatch(/Slip Free$/);
    expect(unarmed.defensive).not.toContain('Slip Free');
  });

  it('keeps source filters in sync with the catalog instead of OCR page headings', () => {
    const sources = getSources();
    expect(new Set(sources).size).toBe(sources.length);
    expect(sources.every(source => !source.includes('Common Special Effects'))).toBeTrue();
    expect(new CombatStylesService().getStyles().find(style => style.name === 'Babylonian Skirmisher')?.source)
      .toBe('Design Mechanism: Mythic Babylon');
  });

  it('keeps every weapon effect separate from the next combat-style heading', () => {
    const weapons = new WeaponService().getWeapons();
    expect(weapons.length).toBe(298);
    for (const weapon of weapons) {
      for (const field of [weapon.offensiveSkills, weapon.defensiveSkills]) {
        for (const reference of (field || '').split(',').map(value => value.trim()).filter(Boolean)) {
          const effect = reference.replace(/\([^)]*\)/g, '').trim();
          expect(knownEffects.has(effect)).withContext(`${weapon.name}: ${reference}`).toBeTrue();
        }
      }
    }
    expect(weapons.find(weapon => weapon.name === 'Rapier')?.offensiveSkills).toBe('Impale');
    expect(weapons.find(weapon => weapon.name === 'Piercing Axe')?.offensiveSkills).toBe('Impale, Sunder');
    expect(weapons.find(weapon => weapon.name === 'Small Handgonne')?.extra).not.toContain('gloves');
  });

  it('opens qualified weapon-effect references without discarding their displayed restrictions', () => {
    expect(specials.getSpecialEffect('Pin Weapon (Shield)')?.effect).toBe('Pin Weapon');
    expect(specials.getSpecialEffect('(*)Disarm (Crit)')?.effect).toBe('Disarm Opponent');
    expect(specials.getSpecialEffect('Overpenetrate')?.effect).toBe('Overpenetration');
    expect(specials.getSpecialEffect('unknown homebrew effect')).toBeUndefined();
  });

  it('does not replace saved custom weapon or combat-style text with catalog corrections', () => {
    const saved = hydrateCharacter({
      equipment: { weapons: [{ name: 'Rapier', offensiveSkills: 'My custom effect', extra: 'My own notes' }] },
      skills: { combatstyles: [{ name: 'Prize Fighter', traits: [{ name: 'Custom hold', trait: 'My rule' }] }] },
    });
    expect(saved.equipment.weapons[0].offensiveSkills).toBe('My custom effect');
    expect(saved.equipment.weapons[0].extra).toBe('My own notes');
    expect(saved.skills.combatstyles[0].traits).toEqual([{ name: 'Custom hold', trait: 'My rule' }]);
  });
});
