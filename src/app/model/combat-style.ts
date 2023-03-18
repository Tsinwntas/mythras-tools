import { Skill } from "./skill";

export class CombatStyle extends Skill {
    override name : string;
    culture: string;
    weapons : string;
    critOffensive : string;
    critDefensive : string;
    offensive : string;
    defensive : string;   
    constructor(name : string, culture : string, weapons : string, critOffensive : string, critDefensive : string, offensive : string, defensive : string){
        super(name, false, 'str','dex');
        this.culture = culture;
        this.weapons = weapons;
        this.critOffensive = critOffensive;
        this.critDefensive = critDefensive;
        this.offensive = offensive;
        this.defensive = defensive;
    }
}