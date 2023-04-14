import { CombatStyle } from 'src/app/model/combat-style';
import { Character } from 'src/app/model/character';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CharacterEquipment } from 'src/app/model/character-equipment';
import { Equipment } from 'src/app/model/equipment';
import { getMoneyAfterClass, getTotalFromItems, getCombatStyles } from 'src/app/services/character-service.service';
import { CharacterWeapon } from 'src/app/model/character-weapon';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentComponent implements OnInit {
  character: Character;

  ngOnInit() {
    if (!this.character.equipment) {
      this.character.equipment = new CharacterEquipment();
    }
    if (!this.character.equipment.head) {
      this.character.equipment.head = new Equipment();
    }
    if (!this.character.equipment.chest) {
      this.character.equipment.chest = new Equipment();
    }
    if (!this.character.equipment.abdoment) {
      this.character.equipment.abdoment = new Equipment();
    }
    if (!this.character.equipment.leftArm) {
      this.character.equipment.leftArm = new Equipment();
    }
    if (!this.character.equipment.rightArm) {
      this.character.equipment.rightArm = new Equipment();
    }
    if (!this.character.equipment.leftLeg) {
      this.character.equipment.leftLeg = new Equipment();
    }
    if (!this.character.equipment.rightLeg) {
      this.character.equipment.rightLeg = new Equipment();
    }
    if (!this.character.equipment.weapons) {
      this.character.equipment.weapons = [];
    }
    if (!this.character.equipment.items) {
      this.character.equipment.items = [];
    }
  }

  getStartingArmour(): string {
    return this.getStartingProp('armour');
  }

  getStartingWeapons(): string {
    return this.getStartingProp('weapons');
  }

  getStartingItems(): string {
    return this.getStartingProp('clothing');
  }

  getStartingProp(prop: string) {
    if (!this.character.socialClass || !this.character.socialClass.class) {
      return 'You should decide on a social class first.';
    }
    return this.findFromMap()![prop] + '.';
  }

  findFromMap(): any {
    return equipmentsMap.find(
      (e) => e.name == this.character.socialClass.class
    )!;
  }

  getStartingMoney(): number {
    return getMoneyAfterClass(this.character);
  }

  getMoneyLeft(): number {
    return getMoneyAfterClass(this.character) -
      getTotalFromItems(this.character, 'cost');
    ;
  }

  getTotalEnc() : number {
    return getTotalFromItems(this.character, 'enc');
  }

  getAllCombatStyles() : CombatStyle[] {
    return getCombatStyles(this.character);
  }

  getWeaponsOfStyle(style: CombatStyle): string {
    return Object.keys(style.weapons).map(k=>k+": "+(style.weapons as any)[k].replace(/[.]/g,"")).join(' / ');
  }

  addNewWeapon() {
    this.character.equipment.weapons.push(new CharacterWeapon("Custom", {}));
  }

  addNewItem() {
    let item = new Item();
    item.name = "Custom";
    this.character.equipment.items.push(item);
  }
}

const equipmentsMap = [
  {
    name: 'Exile',
    clothing: 'One set of ragged, probably dirty clothes ',
    weapons:
      "One well used weapon of a provenance suitable to the character's origin",
    armour:
      'Roll 1d6-3. If the result is greater than zero the outworn armour is worth that many AP, and covers 1d3 locations. Otherwise no armour is owned',
    trasports: 'None',
  },

  {
    name: 'Slave',
    clothing:
      'One or two sets of clothes of a quality suitable for the position and type of work performed by the slave',
    weapons: 'None',
    armour: 'None',
    trasports: 'None',
  },

  {
    name: 'Freeman',
    clothing:
      "Two sets of common, undecorated clothes suitable to the freeman's occupation",
    weapons:
      '1d2 simple weapons suited to the culture. Axes, clubs, knives, spears, slings, and the like',
    armour:
      'Roll 1d3. This represents the Armour Points for the armour the character has. Armour is available to cover 1d6 locations',
    trasports: 'Own back, Raft, Handcart or Beast of Burden',
  },

  {
    name: 'Gentry',
    clothing:
      '1d6+1 sets of clothing, made of good quality fabrics and a modest level of decoration',
    weapons:
      '1d3+1 weapons of higher status, and/or quality. Swords, maces, shields, bows, great weapons, and so on',
    armour: 'Full set of protection worth 1d2+2 Armour Points',
    trasports: 'Hired or Slave Porter, Boat, Wagon or Riding Mount',
  },

  {
    name: 'Aristocracy',
    clothing:
      '1d6+3 sets of clothing, made of expensive fabrics and sporting lots of decoration',
    weapons:
      '1d3+3 weapons of expensive quality, decorated with precious substances',
    armour: 'Full set of protection worth 1d2+3 Armour Points',
    trasports: 'Palanquin, Ship, Chariot or Several Fine Mounts',
  },

  {
    name: 'Ruling',
    clothing:
      '1d6+6 sets of clothing, made of rare, priceless materials and as opulent as good taste allows',
    weapons:
      '1d3+6 weapons of exquisite craftsmanship, each of which are priceless due to heredity or materials',
    armour: 'Full set of protection worth 1d2+4 Armour Points',
    trasports:
      'Expensive Palanquin with matched Bearers, Warship, Exquisite Carriage or Several Magnificent Mounts',
  },
];
