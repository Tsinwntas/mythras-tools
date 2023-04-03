import { WeaponService } from './../../services/weapon.service';
import { resetObject } from 'src/app/services/common.service';
import { Weapon } from './../../model/weapon';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { getWeaponCategories } from 'src/app/services/weapon.service';
import { getWeaponCost } from 'src/app/services/shop.service';

@Component({
  selector: 'weapon',
  templateUrl: './weapon-edit.component.html',
  styleUrls: ['./weapon-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeaponEditComponent {
  @Input() weapon: Weapon;
  @Output() deleteWeapon: EventEmitter<void> = new EventEmitter();
  weaponFilter: string = '';
  weaponGroups: { name: string; weapons: string[] }[];

  constructor(private weaponService: WeaponService) {}

  getWeaponGroups(): { name: string; weapons: string[] }[] {
    if (!this.weaponGroups) {
      this.initWeaponGroups();
    }
    return this.weaponGroups;
  }

  initWeaponGroups() {
    let groups = getWeaponCategories();
    this.weaponGroups = [
      { name: '', weapons: ['Delete Weapon', 'Custom Weapon'] },
    ].concat(
      Object.keys(groups).map((key) => {
        return { name: key, weapons: groups[key] };
      })
    );
  }

  isHidden(filter: string, option: string): boolean {
    return option.toLowerCase().indexOf(filter.toLowerCase()) == -1;
  }

  changedWeapon(weapon: string) {
    if (weapon == 'Delete Weapon') {
      this.deleteWeapon.emit();
      return;
    }
    resetObject(this.weapon);
    if (weapon != 'Custom Weapon') {
      let actualWeapon = this.weaponService.getWeaponByName(weapon);
      Object.keys(actualWeapon).forEach(
        (key) => ((this.weapon as any)[key] = (actualWeapon as any)[key])
      );
      let cost = getWeaponCost(this.weapon.name);
      if (cost != undefined) this.weapon.cost = cost;
    }
  }

  findWeapon(): string {
    let actualWeapon = this.weaponService.getWeaponByName(this.weapon.name);
    return actualWeapon ? actualWeapon.name : 'Custom Weapon';
  }

  getTraits(): string {
    if (!this.weapon.traits) {
      return '';
    }
    return this.weapon.traits
      .map((t) => t.name)
      .filter((t) => t && t != 'name')
      .join(', ');
  }
}
