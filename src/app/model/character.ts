import { CharacterEquipment } from './character-equipment';
import { CharacterPassions } from './character-passions';
import { Rollable } from './rollable';
import { CharacterFamily } from "./character-family";
import { CharacterHP } from "./character-hp";
import { CharacterMagic } from "./character-magic";
import { CharacterSkills } from "./character-skills";
import { SocialClass } from "./social-class";
import { v4 as uuidv4 } from 'uuid';

export class Character {
    id : string;
    player: string;
    name: string;
    gender: string;
    species: string;


    concept : string;
    background : string;
    skills : CharacterSkills;
    height: number;
    weight: number;
    frame : string;

    hp: CharacterHP;
    movementRate: number;
    age: number;
    culture : string;
    backgroundEvents : Rollable[];

    money: number;
    socialClass: SocialClass;
    startingMoney: number;

    passions : CharacterPassions[];
    family: CharacterFamily;
    career : string;
    magic : CharacterMagic;
    institution: string;
    theistCult : {name: string; level: string, standardSkills: string, professionalSkills: string, miracles: string};
    animistCult : {name: string; level: string, standardSkills: string, professionalSkills: string, spirits: string};
    sorceryOrder : {name: string; level: string, standardSkills: string, professionalSkills: string, spells: string};
    mysticalOrder : {name: string; level: string, standardSkills: string, professionalSkills: string, paths: string};
    brotherhood : {name: string; level: string, standardSkills: string, professionalSkills: string};
    backstory : string;
    equipment : CharacterEquipment;

    nativeTongue : string;
    backgroundOverall : string;
    contactsOverall : string;
    moneyOverall : string;
    cultOverall :string;

    devotionPool : number;
    devotionPoolCurrent : number;
    religion : string;

    incomeDay : number;
    incomeWeek : number;
    incomeSeason : number;
    incomeYear : number;

    constructor() {
        this.id = uuidv4();
        this.skills = new CharacterSkills();
        this.hp = new CharacterHP();
        this.magic = new CharacterMagic();
        this.family = new CharacterFamily();
        this.socialClass = new SocialClass();
        this.equipment = new CharacterEquipment();
        this.theistCult = {name: '', level: '', standardSkills: '', professionalSkills: '', miracles: ''};
        this.mysticalOrder = {name: '', level: '', standardSkills: '', professionalSkills: '', paths: ''};
        this.brotherhood = {name: '', level: '', standardSkills: '', professionalSkills: ''};
        this.animistCult = {name: '', level: '', standardSkills: '', professionalSkills: '', spirits: ''};
        this.sorceryOrder = {name: '', level: '', standardSkills: '', professionalSkills: '', spells: ''};
    }

}