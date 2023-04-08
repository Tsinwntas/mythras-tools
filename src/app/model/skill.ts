export class Skill {
    name : string;
    professional : boolean;
    force : boolean;
    base : string[];
    cultureBonus : number;
    careerBonus : number;
    extraBonus : number;
    add : number;
    divide : number;
    multiply : number;

    constructor(name: string, professional : boolean, ...base : string[]) {
        this.name = name;
        this.professional = professional;
        this.base = base;
    }

    setOperations(operators : {add? : number, multiply?: number, divide? : number }) : Skill {
        if(operators.add)
            this.add = operators.add;
        if(operators.multiply)
            this.multiply = operators.multiply;
        if(operators.divide)
            this.divide = operators.divide;

        return this;
    }

    setBase(base: string[]): Skill {
        this.base = base;
        return this;
    }
}