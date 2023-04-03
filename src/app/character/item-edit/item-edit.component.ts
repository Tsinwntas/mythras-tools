import { resetObject } from 'src/app/services/common.service';
import { Item } from './../../model/item';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { getItemCategories, getItemMap } from 'src/app/services/shop.service';

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['../weapon-edit/weapon-edit.component.scss']
})
export class ItemEditComponent {

  @Input() item: Item;
  itemGroups : { name: string; items: string[] }[];
  itemMap : any;
  itemFilter: string = '';
  @Output() deleteItem: EventEmitter<void> = new EventEmitter();

  getItemGroups(): { name: string; items: string[] }[] {
    if (!this.itemGroups) {
      this.initItemGroups();
    }
    return this.itemGroups;
  }

  initItemGroups() {
    this.itemMap = getItemMap();
    let groups = getItemCategories();
    this.itemGroups = [
      { name: '', items: ['Delete Item', 'Custom Item'] },
    ].concat(
      groups.map((g : any) => {
        return { name: g.name, items: g.items };
      })
    );
  }

  isHidden(filter: string, option: string): boolean {
    return option.toLowerCase().indexOf(filter.toLowerCase()) == -1;
  }

  changedItem(item: string) {
    if (item == 'Delete Item') {
      this.deleteItem.emit();
      return;
    }
    resetObject(this.item);
    if (item != 'Custom Item') {
      let actualItem = this.itemMap[item];
      this.item.name = actualItem.item;
      if(actualItem.enc)
        this.item.enc = parseInt(actualItem.enc);
      if(actualItem.cost)
        this.item.cost = parseInt(actualItem.cost);
    }
  }

  findItem(): string {
    if(!this.itemMap)
      this.initItemGroups();
    let actualItem = this.itemMap[this.item.name];
    return actualItem ? actualItem.item : 'Custom Item';
  }
}
