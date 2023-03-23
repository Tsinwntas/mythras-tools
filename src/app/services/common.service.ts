import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
}

export function rollMany(amount: number, d : number, mod?: number) : number{
  return Array.from(Array(amount).keys())
  .map(() => roll(d)).reduce((a, b) => a + b, 0) + (mod ? mod : 0);
}

export function roll(d: number) : number{
  if(!d)
    return 0;
  return Math.floor(Math.random() * d) + 1;
}

export function orZero(num: number) : number {
  return num || 0;
}

export function rollWithTextRange(table: any[], sides: number) : any {
  let dice = roll(sides);
  return table.find(e=>{
    let range = e.range.split('-');
    if(range.length == 1)
      return dice == parseInt(range[0]);
    if(range[1] == '00')
      range[1]='100';
    return dice >= parseInt(range[0]) && dice <= parseInt(range[1]);
  })
}

export function rollWithArrayRange(table: any[], sides: number) : any {
  let dice = roll(sides);
  return table.find(e=>{
    if(e.range.length == 1)
      return dice == parseInt(e.range[0]);
    if(e.range[1] == 0)
      e.range[1]=100;
    return dice >= parseInt(e.range[0]) && dice <= parseInt(e.range[1]);
  })
}