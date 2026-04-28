import { Skill } from "./skill";

export class CombatStyle extends Skill {
    override name : string;
    culture: string;
    source: string;
    campaignSpecific: string;
    traits: {name:string, trait:string}[];
    selectedTrait: {name:string, trait:string};
    weapons : any;
    critOffensive : string;
    critDefensive : string;
    offensive : string;
    defensive : string;   
    constructor(name : string, style : any){
        super(name, false, 'str','dex');
        this.culture = style.culture;
        this.source = style.source;
        this.campaignSpecific = style.campaignSpecific;
        this.traits = style.traits;
        this.selectedTrait = style.selectedTrait;
        this.weapons = style.weapons;
        // Support both raw JSON keys and in-memory camelCase keys.
        this.critOffensive = style['crit-offensive'] ?? style.critOffensive;
        this.critDefensive = style['crit-defensive'] ?? style.critDefensive;
        this.offensive = style.offensive;
        this.defensive = style.defensive;
    }
}
