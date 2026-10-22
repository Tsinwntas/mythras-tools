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
  const sources = Object.values(CombatStyles).flatMap(group =>
    Object.values(group).map(style => (style as any).source as string | undefined)
  );
  return Array.from(new Set(sources.filter((source): source is string => !!source).map(source => source.trim())));
}
