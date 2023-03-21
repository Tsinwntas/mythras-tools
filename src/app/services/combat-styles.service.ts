import { Injectable } from '@angular/core';
import { CombatStyle } from '../model/combat-style';
import CombatStyles from '../jsons/combat-styles.json';

@Injectable({
  providedIn: 'root'
})
export class CombatStylesService {

  styles : CombatStyle[] = [];

  constructor() { }

  getStyles() {
    if(!this.styles.length)
      this.styles = getStyles();
    return this.styles;
  }
}


function getStyles() : CombatStyle[] {
  let styles : CombatStyle[] = [];
  Object.keys(CombatStyles).forEach(key => {
    Object.keys((CombatStyles as any)[key]).forEach(style => {
      styles.push(new CombatStyle(style, ((CombatStyles as any)[key] as any)[style]));
    })
  });
  return styles.filter(style=>!style.source || !style.source.includes('Armies and Enemies'));
}

export function getSources() : string[] {
  return [
    "Campaign - Sofia of the Ironlands's Campaign",
    "Design Mechanism: Mythic Babylon",
    "Design Mechanism: Adventures in Glorantha",
    "Campaign - A Monster Island Campaign",
    "Campaign - Notesfrompavis Glorantha Campaign",
    "Armies and Enemies of Dragon Pass",
    "Armies and Enemies of Dragon Pass Common Special Effects All weapons in this combat style can choose these special effects Critical",
    "Weird of Hali",
    "From Mythras Reddit",
    "Campaign - Gramnaster's Sengoku campaign",
    "Temple of Set",
    "Fioracitta GenCon Scenario",
    "Design Mechanism: Fioracitta",
    "Design Mechanism: Mythic Britain",
    "Campaign - Fan material for Hyborean campaign from RangerDan",
    "Design Mechanism: Shores of Korantia",
    "Design Mechanism: Arakoline Tribute",
    "Design Mechanism: Khakun Shrugs",
    "Antalon Lyonesse Campaign",
    "Design Mechanism: Lyonesse",
    "Mediterranea Mitico",
    "Design Mechanism: Meeros Doomed",
    "Design Mechanism: Hessaret's Treasure",
    "Design Mechanism: Monster Island",
    "Design Mechanism: A Bird In the Hand",
    "Design Mechanism: Logres",
    "Campaign - A Mythic Britain Campaign",
    "Design Mechanism: Mythic Constantinople",
    "Design Mechanism: Mythic Rome",
    "Design Mechanism: Perceforest",
    "Diadochi Warlords",
    "Design Mechanism: Book of Quests",
    "Mjollnir's Medieval Renaissance",
    "Design Mechanism: Mythras",
    "Campaign - Notesfrompavis Glorantha Campaign",
    "Stupor Mundi - Alephtar Games",
    "Broch Goddarth - Scenario",
    "Blood Rock - Scenario",
    "Unapproachable - Scenario",
    "Unapproachable - Scenario",
    "Savage Swords Against Necromancer - Scenario",
    "Blood Rock - Scenario",
    "Broch Goddarth - Scenario",
    "RQ Vikings",
  ]
}