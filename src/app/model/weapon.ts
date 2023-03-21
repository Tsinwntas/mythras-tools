export class Weapon {
    name : string;
    extra : string;
    size : string;
    reach : string;
    ap : string;
    hp : string;
    enc : string;
    ranged : string;
    range : string;
    loadTime : string;
    narrow : string;
    shield : string;
    oneHanded : string;
    twoHanded : string;
    unarmed : string;
    offensiveSkills : string;
    defensiveSkills : string;
    traits : {name: string, description: string}[];

    used: string [];

    constructor(name: string, weapon : any){
        this.used = [];
        this.name = name;
        this.extra = this.use(weapon,'extra');
        this.size = this.use(weapon,'size');
        this.reach = this.use(weapon,'reach');
        this.ap = this.use(weapon,'ap');
        this.hp = this.use(weapon,'hp');
        this.enc = this.use(weapon,'enc');
        this.ranged = this.use(weapon,'ranged');
        this.range = this.use(weapon,'range');
        this.loadTime = this.use(weapon,'loadTime');
        this.narrow = this.use(weapon,'narrow');
        this.shield = this.use(weapon,'shield');
        this.oneHanded = this.use(weapon,'oneHanded');
        this.twoHanded = this.use(weapon,'twoHanded');
        this.unarmed = this.use(weapon,'unarmed');
        this.offensiveSkills = this.use(weapon,'offensiveSkills');
        this.defensiveSkills = this.use(weapon,'defensiveSkills');
        this.traits = [];
        Object.keys(weapon).forEach(k=>{
            if(!this.used.includes(k))
                this.traits.push({name: k, description: weapon[k]});
        })
    }

    use(weapon: any, key: string) : string {
        switch(key){
            case 'size' : key='Size';break;
            case 'reach' : key='Reach';break;
            case 'oneHanded' : key='1h';break;
            case 'ap' : key='AP';break;
            case 'hp' : key='HP';break;
            case 'enc' : key='Enc';break;
            case 'offensiveSkills' : key='offensive-skills';break;
            case 'thrown' : key='Thrown';break;
            case 'ranged' : key='Ranged';break;
            case 'range' : key='Range';break;
            case 'load time' : key='Load time';break;
            case 'extra' : key='Extra';break;
            case 'narrow' : key='Narrow';break;
            case 'double ended' : key='Double Ended';break;
            case 'shield' : key='Shield';break;
            case 'ranged parry' : key='Ranged Parry';break;
            case 'passive block' : key='Passive Block';break;
            case 'twoHanded' : key='2h';break;
            case 'defensive' : key='Defensive';break;
            case 'entrapping' : key='Entrapping';break;
            case 'unarmed' : key='Unarmed';break;
            case 'defensiveSkills' : key='defensive-skills';break;
            case 'flexible' : key='Flexible';break;
            case 'offensive' : key='Offensive';break;
            case 'set' : key='Set';break;
            case 'barbed' : key='Barbed';break;
            case 'mount' : key='Mount';break;
            case '1h/2h' : key='1h/2h';break;
            case 'stealth' : key='Stealth';break;
            case 'concealable' : key='Concealable';break;
            case 'flanged' : key='Flanged';break;
            case 'scatter' : key='Scatter';break;
            case 'puncturing' : key='Puncturing';break;
        }
        this.used.push(key);
        return weapon[key];
    }
}