import { Spell } from "./spell";

export class MysticPath {
    path: string;
    augmentations: string[];
    invocations: Spell[];
    enhancements: Spell[];

    constructor() {
        this.path = "";
        this.augmentations = [];
        this.invocations = [];
        this.enhancements = [];
    }
}