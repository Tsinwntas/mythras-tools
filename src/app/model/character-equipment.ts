import { Equipment } from './equipment';
import { Item } from './item';
import { CharacterWeapon } from './character-weapon';
export class CharacterEquipment {
    head: Equipment;
    chest: Equipment;
    abdoment: Equipment;
    leftArm: Equipment;
    rightArm: Equipment;
    leftLeg: Equipment;
    rightLeg: Equipment;
    weapons: CharacterWeapon[];
    items : Item[];

    equipmentEnc : number;
    armourEnc : number;
    totalEnc : number;
    armorPenalty : number;
    equipmentAndArmor : string;

    constructor() {
        this.head = new Equipment();
        this.chest = new Equipment();
        this.abdoment = new Equipment();
        this.leftArm = new Equipment();
        this.rightArm = new Equipment();
        this.leftLeg = new Equipment();
        this.rightLeg = new Equipment();
        this.weapons = [];
        this.items = [];
    }
}