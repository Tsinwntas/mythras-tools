import { initSkills } from "../services/character-service.service";
import { CombatStyle } from "./combat-style";
import { Skill } from "./skill";

export class CharacterSkills {
    str : number;
    dex : number;
    con : number;
    pow : number;
    cha : number;
    int : number;
    siz : number;
    ap : Skill;
    damage: Skill;
    expMod : Skill;
    healing : Skill;
    init: Skill;
    luck : Skill;
    skills : Skill[];
    specialized: Skill[];
    combatstyles : CombatStyle[]; 
    hobby : Skill;

    extraProfessionalCultureSkills : Skill[];
    extraProfessionalCareerSkills : Skill[];

    constructor() {
        this.ap = new Skill("Action Points", false, "int","dex").setOperations({divide:12});
        this.damage = new Skill("Damage Modifier", false, "str","siz").setOperations({divide:5});
        this.expMod = new Skill("Experience Modifier", false, "cha").setOperations({divide:6, add: -2});
        this.healing = new Skill("Healing Rate", false, "con").setOperations({divide:6});
        this.init = new Skill("Initiative", false, "int","dex").setOperations({divide:2});
        this.luck = new Skill("Luck", false, "pow").setOperations({divide:6});
        this.combatstyles = [];
        this.specialized = [];
        this.extraProfessionalCultureSkills = [];
        this.extraProfessionalCareerSkills = [];
        initSkills(this);
    }
}