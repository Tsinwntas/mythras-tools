import { SocialClass } from './social-class';

export class SocialClasses {}

export const BarbarianSocialClasses: {
  percLow: number;
  percHigh: number;
  socialClass: SocialClass;
}[] = [
  {
    percLow: 1,
    percHigh: 5,
    socialClass: {
      class: 'Outcast',
      titles: 'Exile, Outlaw',
      moneyMultiplier: 0.25,
      resources:
        'Nothing but the clothes on their back, and maybe some personal armament',
    },
  },
  {
    percLow: 6,
    percHigh: 15,
    socialClass: {
      class: 'Slave',
      titles: 'Bondsman, Caxtos, Peon, Serf, Thrall',
      moneyMultiplier: 0.5,
      resources: 'Resides on owners property; owns a few keepsakes',
    },
  },
  {
    percLow: 16,
    percHigh: 80,
    socialClass: {
      class: 'Freeman',
      titles: 'Churl, Commoner, Feine, Freedman, Karl, Labourer',
      moneyMultiplier: 1,
      resources:
        'Rented accommodation or farmaland; possesses own tools or livestock, simple weapons',
    },
  },
  {
    percLow: 81,
    percHigh: 95,
    socialClass: {
      class: 'Gentry',
      titles: 'Ealdormen, Elaith, Hauldr, Reeve, Thane',
      moneyMultiplier: 3,
      resources:
        'Owns a house and either a farmstead, business or ship; furniture; tools, weapons and armour, mount, several servant or slave retainers; support from locals',
    },
  },
  {
    percLow: 96,
    percHigh: 100,
    socialClass: {
      class: 'Ruling',
      titles: 'Chieftain, Cyning, Eorl, Jarl, King',
      moneyMultiplier: 5,
      resources:
        'Owns a great hall and either a farmstead, business or ship; furniture; tools, weapons and armour all of high quality, mount, several servant or slave retainers; fealty from a country or smaller region',
    },
  },
];

export const CivilizedSocialClasses: {
  percLow: number;
  percHigh: number;
  socialClass: SocialClass;
}[] = [
  {
    percLow: 1,
    percHigh: 2,
    socialClass: {
      class: 'Outcast',
      titles: 'Beggar, Mendicant, Vagabond, Vagrant',
      moneyMultiplier: 0.25,
      resources:
        'Nothing but the clothes on their back, and maybe some personal armament',
    },
  },
  {
    percLow: 3,
    percHigh: 20,
    socialClass: {
      class: 'Slave',
      titles: 'Chattel, Captive, Helot, Servant',
      moneyMultiplier: 0.5,
      resources: 'Resides on owners property; owns a few keepsakes',
    },
  },
  {
    percLow: 21,
    percHigh: 70,
    socialClass: {
      class: 'Freeman',
      titles: 'Citizen, Peasant, Proletariat, Tenant, Vassal',
      moneyMultiplier: 1,
      resources:
        'Rented accommodation or farmaland; possesses own tools or livestock, simple weapons',
    },
  },
  {
    percLow: 71,
    percHigh: 95,
    socialClass: {
      class: 'Gentry',
      titles: 'Bailiff, Equite, Master, Official, Steward, Warden',
      moneyMultiplier: 3,
      resources:
        'Owns property, farm or business; furniture, tools, weapons & armour, mount, several servant or slave retainers; support from locals',
    },
  },
  {
    percLow: 96,
    percHigh: 99,
    socialClass: {
      class: 'Aristocracy',
      titles:
        'Archon, Baron, Count, Duke, Lord, Nawab, Noble, Oligarch, Patrician, Satrap',
      moneyMultiplier: 5,
      resources:
        'Owns several properties, extensive farmlands or multiple businesses; expensive furniture, tools, weapons & armour, mounts, many servants or slaves; fealty from regional inhabitants',
    },
  },
  {
    percLow: 100,
    percHigh: 100,
    socialClass: {
      class: 'Ruling',
      titles:
        'Caliph, Czar, Dictator, Emperor, Imperator, Maharajah, Mogul, Pasha, Pharaoh, Potentate, Prince, Rajah, Shah, Sultan, Tyrant',
      moneyMultiplier: 10,
      resources:
        'Owns several properties, extensive farmlands or multiple businesses; expensive furniture, tools, weapons & armour, mounts, many servants or slaves; fealty from regional inhabitants; fealty from a dominion or nation',
    },
  },
];

export const NomadSocialClasses: {
  percLow: number;
  percHigh: number;
  socialClass: SocialClass;
}[] = [
  {
    percLow: 1,
    percHigh: 5,
    socialClass: {
      class: 'Outcast',
      titles: 'Outlaw, Rebel',
      moneyMultiplier: 0.25,
      resources:
        'Nothing but the clothes on their back, and maybe some personal armament, and a mount or small boat if suitable',
    },
  },
  {
    percLow: 6,
    percHigh: 10,
    socialClass: {
      class: 'Slave',
      titles: 'Bool, Convict, Prisoner, Thrall',
      moneyMultiplier: 0.5,
      resources: "Resides on conquered lands, or in owner's yurt or vessel, owns a few keepsakes, plus tools or simple weapon",
    },
  },
  {
    percLow: 11,
    percHigh: 90,
    socialClass: {
      class: 'Freeman',
      titles: 'Arad, Haran, Kinsmen, Subjects',
      moneyMultiplier: 1,
      resources:
        'Possesses own mounts, cart or small boat; owns yurt or similar, half a dozen livestock, weapons, simple armour, a slave or two',
    },
  },
  {
    percLow: 91,
    percHigh: 100,
    socialClass: {
      class: 'Ruling',
      titles: 'Chieftain, Emir, Khan, Khaqan, Sea Lord, Sheikh',
      moneyMultiplier: 3,
      resources:
        'Owns many mounts, carts or boats; large yurt or similar, several dozen livestock, good weapons, good armour, some slaves, fealty from tribe and conquered peoples',
    },
  },
];

export const PrimitiveSocialClasses: {
  percLow: number;
  percHigh: number;
  socialClass: SocialClass;
}[] = [
  {
    percLow: 1,
    percHigh: 5,
    socialClass: {
      class: 'Outcast',
      titles: 'Outlaw',
      moneyMultiplier: 0.25,
      resources:
        'A weapon and a few knickknacks',
    },
  },
  {
    percLow: 6,
    percHigh: 80,
    socialClass: {
      class: 'Freeman',
      titles: 'Tribesman',
      moneyMultiplier: 1,
      resources:
        'Simple home, tools, and primitive weapons',
    },
  },
  {
    percLow: 81,
    percHigh: 100,
    socialClass: {
      class: 'Ruling',
      titles: 'Chieftain, Elder',
      moneyMultiplier: 2,
      resources:
        'Large hall; valuable skins, totems, trophies, tools, cooking implements, decorated primitive weapons, simple armour; support from tribe'
    },
  },
];


export function getSocialClassesOfCulture(culture : string) : {
    percLow: number;
    percHigh: number;
    socialClass: SocialClass;
  }[] {
    switch(culture) {
        case 'Barbarian': return BarbarianSocialClasses;
        case 'Civilized': return CivilizedSocialClasses;
        case 'Nomadic': return NomadSocialClasses;
        case 'Primitive': return PrimitiveSocialClasses;
    }
    return [];
}