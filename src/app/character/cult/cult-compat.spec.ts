import { hydrateCharacter } from '../../services/character-format';
import { CultComponent } from './cult.component';

describe('Cult catalog OCR compatibility', () => {
  it('keeps a legacy fire cult selected without rewriting the saved character', () => {
    const component = new CultComponent();
    component.character = hydrateCharacter({
      theistCult: { name: 'Sun God/Eire God', level: 'Priest' },
    });

    expect(component.getTheistCult()?.name).toBe('Sun God/Fire God');
    expect(component.character.theistCult.name).toBe('Sun God/Eire God');
    expect(component.character.theistCult.level).toBe('Priest');
  });

  it('keeps a legacy brotherhood selected without rewriting the saved character', () => {
    const component = new CultComponent();
    component.character = hydrateCharacter({
      brotherhood: { name: 'Criminal Eraternity', level: 'Journeyman' },
    });

    expect(component.getBrotherhood()?.name).toBe('Criminal Fraternity');
    expect(component.character.brotherhood.name).toBe('Criminal Eraternity');
    expect(component.character.brotherhood.level).toBe('Journeyman');
  });
});
