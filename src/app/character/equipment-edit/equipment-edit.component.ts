import { Equipment } from './../../model/equipment';
import { Component, Input } from '@angular/core';
import { resetObject } from 'src/app/services/common.service';

@Component({
  selector: 'equipment',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent {

  @Input() equipment : Equipment;

  changedBaseMaterial(base : string) : void {
    resetObject(this.equipment);
    this.equipment.baseMaterial = base;
  }

  changedMaterial(material : string) : void {
    this.equipment.material = material;
    if(this.equipment.construction)
      this.equipment.enc = constructions[this.equipment.construction].enc*materials[this.equipment.material];
  }

  getMaterials() : string[] {
    return Object.keys(materials);
  }

  getTypes() : string[] {
    if(!this.equipment.construction)
      return [];
    return constructions[this.equipment.construction].types;
  }

  changedConstruction(construction : string) : void {
    this.equipment.construction = construction;
    this.equipment.type = constructions[construction].types[0];
    this.equipment.ap = constructions[construction].ap;
    // this.equipment.hp = this.getHpFromConstruction();
    this.equipment.enc = constructions[construction].enc*(this.equipment.material?materials[this.equipment.material]:1);
    this.equipment.cost = constructions[construction].cost;
  }

  getConstructions() : string[] {
    if(!this.equipment.baseMaterial)
      return Object.keys(constructions);
    return baseMaterials[this.equipment.baseMaterial];
  }

}

const baseMaterials : any = {
  "Flexible" : [
    "Natural/Cured", 
    "Padded/Quilted",
    "Laminated",
    "Scaled"
  ],
  "Rigid" : [
    "Half Plate",
    "Mail",
    "Plated Mail",
    "Articulated Plate"
  ]
}

const materials : any = {
  "Bone" : 1.5,
  "Bronze" : 1,
  "Chitin" : 0.75,
  "Iron" : 1,
  "Ivory" : 1.25,
  "Leather" : 2,
  "Linen" : 1,
  "Shell" : 2,
  "Silk" : 0.75,
  "Steel" : 0.75,
  "Stone" : 3
}

const constructions : any = {
  "Natural/Cured" : {
    types: [
      "Furs", "Hides"
    ],
    ap: 1,
    enc: 2,
    cost: 20
  },
  "Padded/Quilted" : {
    types: [
      "Aketon", "Gambeson"
    ],
    ap: 2,
    enc: 1,
    cost: 80
  },
  "Laminated" : {
    types: [
      "Linothorax", "Bezainted"
    ],
    ap: 3,
    enc: 2,
    cost: 180
  },
  "Scaled" : {
    types: [
      "Brigandine", "Lamellar"
    ],
    ap: 4,
    enc: 3,
    cost: 320
  },

  "Half Plate" : {
    types: [
      "Hoplite Plate"
    ],
    ap: 5,
    enc: 4,
    cost: 500
  },
  "Mail" : {
    types: [
      "Mail Hauberk", "Laminar"
    ],
    ap: 6,
    enc: 5,
    cost: 900
  },
  "Plated Mail" : {
    types: [
      "Splinted Chainmail"
    ],
    ap: 7,
    enc: 6,
    cost: 1400
  },
  "Articulated Plate" : {
    types: [
      "Gothic Plate"
    ],
    ap: 8,
    enc: 7,
    cost: 2400
  },

}
