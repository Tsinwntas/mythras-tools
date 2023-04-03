import { Injectable } from '@angular/core';
import weaponShop from '../jsons/weapon-shop.json';
import toolShop from './../jsons/tools-shop.json';
import clothesShop from './../jsons/cloths-shop.json';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }
}

export function getWeaponCost(weapon : string) : number | undefined {
  let weaponFound = weaponShop.find(w => w.weapon.toLowerCase().replace(/[ ]/g,"") === weapon.toLowerCase().replace(/[ ]/g,""));
  if(!weaponFound)
    return undefined;
  return parseInt(weaponFound.cost);
}

export function getItemMap() : any {
  let shop : any = {};
  toolShop.forEach(t=>{
    shop[t.item]=t;
  })
  clothesShop.forEach(c=>{
    let cheap = {item : c.name+" - Cheap", cost : c.cheap};
    let res = {item : c.name+" - Reasonable", cost : c.reasonable};
    let sup = {item : c.name+" - Superior", cost : c.superior};
    shop[cheap.item]=cheap;
    shop[res.item]=res;
    shop[sup.item]=sup;
  })
  return shop;
}

export function getItemCategories() : any {
  return [
    {name: "Clothes",
    items: clothesShop.map(c => [c.name+" - Cheap", c.name+" - Reasonable", c.name+" - Superior"]).flat()},
    {name: "Tools",
    items: toolShop.map(c => c.item)}
  ]
}