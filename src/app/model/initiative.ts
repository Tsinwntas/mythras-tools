export class Initiative {
    participants : {
        initiative: number,
        actionPoints: number
        name: string,
        head: number,
        chest: number,
        abdoment: number,
        leftArm: number,
        rightArm: number,
        leftLeg: number,
        rightLeg: number,
    }[]

    constructor(){
        this.participants = [];
    }
}