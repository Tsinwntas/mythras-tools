import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassionsService {

  constructor() { }
}

export const Passions = [
  {
    objectOfPassion: 'A person, in a romantic or familial context',
    examples:
      'Lover, Sibling, Wife, Parent, Aloof or Unsuspecting Object of Desire',
    savingPercentage: "30% plus Loved one's POW+CHA",
  },

  {
    objectOfPassion:
      'A person in a platonic context (a friendship or loyalty, for example)',
    examples: 'Leader, Teacher, Ruler, Master, Rescuer, Priest, Enemy',
    savingPercentage: "30% plus Character's POW and subject's CHA",
  },

  {
    objectOfPassion: 'A person in an averse context',
    examples:
      'Enemy leader, Rival worker, Husband of Desired Lover, Murderer of Eriend, Thief',
    savingPercentage: "30% plus Character's POW and subject's CHA",
  },
  {
    objectOfPassion: 'An organisation or group of people',
    examples:
      'Eamily, School, Temple, Religion, Local Community, Military Unit, Guild, Nobles',
    savingPercentage: "30% plus Character's POW+INT",
  },
  {
    objectOfPassion: 'A race or species',
    examples:
      'Eoreigners, Non Humans, Tigers, Supernatural Beasts, Ghosts, Primitives',
    savingPercentage: "30% plus Character's POW x 2",
  },
  {
    objectOfPassion: 'A place',
    examples:
      'A Country, Home Town, Holy Place, Capital City, Graveyards, Mountains',
    savingPercentage: "30% plus Character's POW+INT",
  },
  {
    objectOfPassion: 'An object or substance',
    examples:
      'The Iron Throne, Diabolic Relic, Magic, Darkness, Ancient Heirloom, Gemstones',
    savingPercentage: "30% plus Character's POW x 2",
  },
  {
    objectOfPassion: 'A concept or ideal',
    examples:
      'An Ethic, Moral Code, Ereedom, Personal Honour, Betrayal, Dishonesty',
    savingPercentage: "30% plus Character's POW+INT",
  },
];