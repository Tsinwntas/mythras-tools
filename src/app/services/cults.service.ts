import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CultsService {
  constructor() {}
}

export const TheismCults = [
  {
    name: 'Air/Storm God',
    level: 'Lay Member',
    standardSkills: 'Air God: Athletics, Evade / Storm God: Athletics, Brawn',
    professionalSkills: 'Devotion, Exhort, Survival',
    miracles:
      'Berserk, Call Winds, Clear Skies, Cloud Call, Dismiss Elemental, Elemental Summoning (Sylph), Lightning, Rain of Hail, Sacred Band, Shield, Thunderclap',
  },
  {
    name: 'Crafter God',
    level: 'Lay Member',
    standardSkills: 'Brawn, Endurance',
    professionalSkills: 'Craft (Any), Devotion, Exhort',
    miracles:
      'Backlash, Dismiss Magic, Eortify, Harmonise, Leeching, Mindlink, Backlash, Dismiss Magic, Eortify, Harmonise, Leeching, Mindlink',
  },
  {
    name: 'Death God',
    level: 'Lay Member',
    standardSkills: 'Influence, Willpower, Combat Style',
    professionalSkills: 'Devotion, Exhort',
    miracles:
      'Aegis, Backlash, Bind Ghost, Corruption, Dismiss Magic, Fear, Heart, Seizure, Lay to Rest, Raise Undead, Sever Spirit, Soul Sight, Spirit Block, True (Weapon)',
  },
  {
    name: 'Earth God',
    level: 'Lay Member',
    standardSkills: 'Brawn, Locale',
    professionalSkills:
      'Devotion, Exhort, and either Engineering or Lore (Mining or Smithing)',
    miracles: 'Absorption, Backlash, Dismiss Elemental, Earthquake, Elemental',
  },
  {
    name: 'Fertility Goddess',
    level: 'Lay Member',
    standardSkills: 'Endurance, Locale',
    professionalSkills: 'Craft (Earming or Husbandry), Devotion, Exhort',
    miracles:
      'Beast Eorm, Bless Crops, Clear Skies, Cloud Call, Dismiss Magic, Entangle, Enthrall, Eecundity, Growth, Heal Wound, Pacify, Ripen',
  },
  {
    name: 'Healing God',
    level: 'Lay Member',
    standardSkills: 'First Aid, Endurance',
    professionalSkills: 'Devotion, Exhort, Healing',
    miracles:
      'Cure Malady, Cure Sense, Dismiss Magic, Exorcism, Eecundity, Heal  Body, Heal Mind, Heal Wound, Lay to Rest, Pacify, Rejuvenate, Resurrect',
  },
  {
    name: 'Hunter God',
    level: 'Lay Member',
    standardSkills: 'Athletics, Stealth',
    professionalSkills: 'Devotion, Exhort, Track',
    miracles:
      'Beast Eorm, Chameleon, Cloud Call, Dismiss Magic, Entangle, Harmonise, Illusion, Lay to Rest, Pacify, Shield, Sureshot, True (Weapon)',
  },
  {
    name: 'Knowledge God',
    level: 'Lay Member',
    standardSkills: 'Customs, Perception',
    professionalSkills: 'Devotion, Exhort, Lore (Any)',
    miracles:
      'Dismiss Magic, Heal Mind, Mindblast, Mindlink, Obliterate, Propitiate, Reflection, Soul Sight, Spirit Block, Steadfast',
  },
  {
    name: 'Sea/Water God',
    level: 'Lay Member',
    standardSkills: 'Boating, Swim',
    professionalSkills:
      'Devotion, Exhort, and either Craft (Eishing) or Seamanship',
    miracles:
      'Beast Eorm, Breathe Water, Call Winds, Dismiss Elemental, Elemental Summoning (Undine), Perseverance, Propitiate, Sacred Band, Steadfast, Thunderclap',
  },
  {
    name: 'Sun God/Eire God',
    level: 'Lay Member',
    standardSkills: 'Influence, Insight',
    professionalSkills: 'Devotion, Exhort, Oratory',
    miracles:
      'Aegis, Clear Skies, Dismiss Elemental, Elemental Summoning (Salamander), Fear, Illusion, Leeching, Mirage, Rain of Fire, Sacred Band, Shield, Sunspear',
  },
  {
    name: 'Trading God',
    level: 'Lay Member',
    standardSkills: 'Customs, Insight',
    professionalSkills: 'Commerce, Devotion, Exhort',
    miracles:
      'Dismiss Magic, Enthrall, Illusion, Mindlink, Pacify, Perseverance, Propitiate, Reflection, Soul Sight',
  },
  {
    name: 'Trickster God',
    level: 'Lay Member',
    standardSkills: 'Conceal, Deceit',
    professionalSkills: 'Devotion, Disguise, Exhort',
    miracles:
      'Absorption, Backlash, Beast Eorm, Chameleon, Corruption, Dismiss Magic, Enthrall, Fear, Harmonise, Illusion, Madness, Mirage, Soul Sight',
  },
  {
    name: 'War God',
    level: 'Lay Member',
    standardSkills: 'Combat Style, Evade, Endurance',
    professionalSkills: 'Devotion, Exhort',
    miracles:
      'Aegis, Berserk, Dismiss Magic, Fortify, Perseverance, Reflection, Sacred Band, Shield, Steadfast, Sureshot, True (Weapon)',
  },
];

export const AnimistCults = [
  {
    name: 'Ancestor Cult',
    level: 'Follower',
    standardSkills: 'Customs, Insight, Perception',
    professionalSkills: 'Binding, Lore (Ancestors), Trance',
    spirits: 'Ancestors',
  },
  {
    name: 'Animal Spirit',
    level: 'Follower',
    standardSkills: 'Athletics, Evade, Ride',
    professionalSkills: 'Binding, Lore (Animal Spirit), Trance',
    spirits: 'Animal Spirits, Predator Spirits',
  },
  {
    name: 'Nature Spirit',
    level: 'Follower',
    standardSkills: 'Insight, Locale, Willpower',
    professionalSkills: 'Binding, Lore (Nature Spirit), Trance',
    spirits: 'Nature Spirits, associated Animal Spirits',
  },
  {
    name: 'Healing Spirit',
    level: 'Follower',
    standardSkills: 'Endurance, First Aid',
    professionalSkills: 'Binding, Lore (Healing Spirit), Healing, Trance',
    spirits: 'Healing Spirit, Guardian Spirits',
  },
  {
    name: 'Disease Spirit',
    level: 'Follower',
    standardSkills: 'Influence, Willpower, Endurance',
    professionalSkills: 'Lore (Disease Spirit), Trance',
    spirits: 'Disease Spirits, perhaps Curse Spirits',
  },
];

export const Brotherhoods = [
  {
    name: 'Alchemical Society',
    level: 'Associate',
    standardSkills: 'Insight, Perception, Willpower',
    professionalSkills: 'Lore (Alchemy), Lore (Minerals)',
  },
  {
    name: 'Astrological/Astronomical Fellowship',
    level: 'Associate',
    standardSkills: 'Insight, Perception',
    professionalSkills:
      'Lore (Astrology), Lore (Astronomy), Lore (Mathematics)',
  },
  {
    name: 'College/University Alumni',
    level: 'Associate',
    standardSkills: 'Customs, Influence, Willpower',
    professionalSkills: 'Lore (Any Two)',
  },
  {
    name: 'Criminal Eraternity',
    level: 'Associate',
    standardSkills: 'Conceal, Deceit, Endurance',
    professionalSkills: 'Disguise, Sleight',
  },
  {
    name: 'Masons',
    level: 'Associate',
    standardSkills: 'Endurance, Insight, Locale',
    professionalSkills: 'Craft (Masonry), Engineering',
  },
  {
    name: 'Mercenary Company',
    level: 'Associate',
    standardSkills: 'Athletics, Evade, Two Combat Styles',
    professionalSkills: 'Lore (Strategy and Tactics)',
  },
  {
    name: 'Merchant Venturers',
    level: 'Associate',
    standardSkills: 'Influence, Perception',
    professionalSkills: 'Commerce, Navigate, Seamanship',
  },
  {
    name: 'Midwives',
    level: 'Associate',
    standardSkills: 'First Aid, Influence, Locale',
    professionalSkills: 'Healing, Lore (Midwifery)',
  },
  {
    name: 'Physicians',
    level: 'Associate',
    standardSkills: 'First Aid, Insight, Locale',
    professionalSkills: 'Healing, Lore (Herbs)',
  },
  {
    name: 'Political Party or Movements',
    level: 'Associate',
    standardSkills: 'Customs or Deceit, Influence, Insight',
    professionalSkills: 'Orate, Lore (Politics)',
  },
  {
    name: "Ship's Company",
    level: 'Associate',
    standardSkills: 'Athletics, Boating, Endurance',
    professionalSkills: 'Navigate, Seamanship',
  },
  {
    name: "Thieves'/Assassins' Guild",
    level: 'Associate',
    standardSkills: 'Conceal, Deceit, Evade, One Combat Style',
    professionalSkills: 'Sleight',
  },
  {
    name: 'Trade and Craft Guild',
    level: 'Associate',
    standardSkills: 'Customs, Perception',
    professionalSkills: 'Commerce, Craft (Appropriate to the Guild)',
  },
  {
    name: 'Warband',
    level: 'Associate',
    standardSkills:
      'Athletics, Brawn, Evade, Endurance, One Combat Style Appropriate to the Band',
    professionalSkills: 'Lore (Strategy and Tactics)',
  },
];

export const MysticalOrders = [
  {
    name: 'Monastic Order of Epistemology',
    level: 'Aspirant',
    standardSkills: 'None',
    professionalSkills:
      'Language (any), Literacy, Lore (any), Meditation, Mysticism',
    paths:
      'The Way of All Knowledge: Augment Insight, Augment Language, Augment Lore, Invoke Aura (Wisdom), Invoke Awareness, Invoke Denial (Ignorance), Invoke Magic Sense',
  },
  {
    name: 'Brotherhood of the Healing Hands',
    level: 'Aspirant',
    standardSkills: 'First Aid, Locale',
    professionalSkills: 'Healing, Meditation, Mysticism',
    paths:
      'Path of Healing: Augment Endurance, Augment First Aid, Augment Healing, Invoke Disease Immunity, Invoke Poison Immunity, Enhance Healing Rate, Enhance Fatigue',
  },
  {
    name: 'School of Impenetrable Silence',
    level: 'Aspirant',
    standardSkills: 'Perception, Stealth',
    professionalSkills: 'Sleight, Meditation, Mysticism',
    paths:
      'Path of Shadows: Augment Perception, Augment Stealth, Augment Unarmed, Augment Ranged Combat Style, Invoke Adhesion, Invoke Dark Sight, Enhance Movement',
  },
  {
    name: 'Fellowship of the Snake',
    level: 'Aspirant',
    standardSkills: 'Deceit, Influence',
    professionalSkills: 'Oratory, Meditation, Mysticism',
    paths:
      'Path of Deceit: Augment Conceal, Augment Deceit, Augment Influence, Augment Sleight, Augment Willpower, Invoke Night Sight, Enhance Movement',
  },
  {
    name: 'School of the Leaping Tiger',
    level: 'Aspirant',
    standardSkills: 'Athletics, Unarmed',
    professionalSkills: 'Survival, Meditation, Mysticism',
    paths:
      'Way of the Tiger: Augment Athletics, Augment Brawn, Augment Endurance, Augment Unarmed, Invoke Eormidable Natural Weapons, Enhance Action Points, Enhance Damage Modifier',
  },
  {
    name: 'Order of Asceticism',
    level: 'Aspirant',
    standardSkills: 'Endurance, Willpower',
    professionalSkills: 'Survival, Meditation, Mysticism',
    paths:
      'Way of Abjuration: Augment Endurance, Augment Survival, Invoke Denial (Eood), Invoke Denial (Water), Invoke Denial (Sleep), Enhance Eatigue, Enhance Hit Points',
  },
  {
    name: 'School of Enlightened Being',
    level: 'Aspirant',
    standardSkills: 'Customs, Influence',
    professionalSkills: 'Lore (any), Meditation, Mysticism',
    paths:
      'Way of Reason: Augment Customs, Augment Influence, Augment Insight, Augment Willpower, Invoke Aura (Authority), Invoke Aura (Wisdom), Enhance Initiative',
  },
];

export const SorceryOrders = [
  {
    name: 'Military Order',
    level: 'Novice',
    standardSkills: 'Combat Style, Unarmed',
    professionalSkills: 'Lore (Strategy and Tactics), Invocation, Shaping',
    spells:
      'Attract Missile, Bypass Armour, Damage Enhancement, Damage Resistance, Haste, Protective Ward, Transfer Wound',
  },
  {
    name: 'Necromantic Order',
    level: 'Novice',
    standardSkills: 'Endurance, Willpower',
    professionalSkills: 'Lore (Undead), Invocation, Shaping',
    spells:
      'Abjure (Decay), Dominate (Undead), Revivify, Spirit Resistance, Transfer Wound, Trap Soul, Undeath',
  },
  {
    name: 'Alchemical Order',
    level: 'Novice',
    standardSkills: 'Locale',
    professionalSkills: 'Commerce, Lore (Alchemy), Invocation, Shaping',
    spells:
      'Diminish (Characteristic), Enlarge, Holdfast, Neutralise Magic, Sculpt (Substance), Shrink, Transmogrify (to Substance)',
  },
  {
    name: 'Scholastic Order',
    level: 'Novice',
    standardSkills: 'Insight, Perception',
    professionalSkills: 'Lore (any), Invocation, Shaping',
    spells:
      'Abjure (Process), Intuition, Mystic (Sense), Neutralise Magic, Perceive (Sense), Project (Sense), Sense (Knowledge)',
  },
  {
    name: 'Hermetic Order',
    level: 'Novice',
    standardSkills: 'Perception, Willpower',
    professionalSkills: 'Lore (any), Invocation, Shaping',
    spells:
      'Abjure (Substance), Banish, Damage Resistance, Mystic (Sense), Protective Ward, Spirit Resistance, Spell Resistance',
  },
  {
    name: 'Dark Eorces Order',
    level: 'Novice',
    standardSkills: 'Insight, Stealth',
    professionalSkills: 'Disguise, Invocation, Shaping',
    spells:
      'Castback, Enslave (Creatures), Evoke (Entity), Imprison, Smother, Tap (Characteristic), Wrack',
  },
  {
    name: 'Communication Order',
    level: 'Novice',
    standardSkills: 'Customs, Influence',
    professionalSkills: 'Language (any), Invocation, Shaping',
    spells:
      'Fly, Haste, Intuition, Phantom (Sense), Project (Sense), Telepathy, Teleport',
  },
  {
    name: 'Medical Order',
    level: 'Novice',
    standardSkills: 'First Aid, Locale',
    professionalSkills: 'Healing, Invocation, Shaping',
    spells:
      'Abjure, Damage Resistance, Neutralise Magic, Palsy, Regenerate, Repulse (Vermin), Transfer Wound',
  },
  {
    name: 'Transmutation Order',
    level: 'Novice',
    standardSkills: 'Endurance, Unarmed',
    professionalSkills: 'Lore (Creatures), Invocation, Shaping',
    spells:
      'Dominate (Creatures), Draw (Creatures), Enhance (Characteristic), Haste, Perceive (Sense), Shapechange (to Creature), Switch Body',
  },
];
