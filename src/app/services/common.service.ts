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
  return Math.floor(Math.random() * d) + 1;
}

export function orZero(num: number) : number {
  return num || 0;
}