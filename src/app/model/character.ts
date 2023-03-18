import { CharacterCareer } from "./character-career";
import { CharacterFamily } from "./character-family";
import { CharacterHP } from "./character-hp";
import { CharacterMagic } from "./character-magic";
import { CharacterSkills } from "./character-skills";
import { SocialClass } from "./social-class";

export class Character {
    player: string;
    name: string;
    gender: string;
    species: string;


    concept : string;
    skills : CharacterSkills;
    height: number;
    weight: number;
    frame : string;

    hp: CharacterHP;
    movementRate: number;
    age: number;
    culture : string;
    backgroundEvent : string;
    money: string;
    socialClass: SocialClass;
    family: CharacterFamily;
    career : CharacterCareer;
    magic : CharacterMagic;
    institution: string;
    rank : string;
    backstory : string;

    constructor() {
        this.skills = new CharacterSkills();
        this.hp = new CharacterHP();
        this.magic = new CharacterMagic();
        this.family = new CharacterFamily();
        this.career = new CharacterCareer();
        this.socialClass = new SocialClass();
    }

}