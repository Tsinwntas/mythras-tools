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
}