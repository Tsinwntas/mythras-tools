import { Character } from "./character";
import { Skill } from "./skill";

export class CharacterHP {
    head : Skill = getHPSkill('Head', 0);
    chest : Skill = getHPSkill('Chest',2);
    abdoment : Skill = getHPSkill('Abdoment',1);
    leftArm : Skill = getHPSkill('Left Arm',-1);
    rightArm : Skill = getHPSkill('Right Arm',-1);
    leftLeg : Skill = getHPSkill('Left Leg',0);
    rightLeg : Skill = getHPSkill('Right Leg',0);
}

function getHPSkill(name : string , add : number) : Skill {
    return  new Skill(name, false, 'con', 'siz').setOperations({divide:5, add: add});
}
