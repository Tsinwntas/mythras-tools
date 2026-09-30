export class Initiative {
    participants : {
        initiative: number,
        con: number,
        fatigue: number,
        actionPoints: number,
        used: number,
        name: string
    }[]

    constructor(){
        this.participants = [];
    }
}