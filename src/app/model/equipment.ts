import { Item } from './item';
export class Equipment extends Item {
    equipped: boolean;
    baseMaterial : string;
    material : string;
    construction: string;
    type: string;
}