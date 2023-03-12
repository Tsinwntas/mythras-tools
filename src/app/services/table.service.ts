import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  getColumnHeader(col :string) : string {
    return getColumnHeader(col);
  }
}

export function getColumnHeader(col : string, leaveEmpty? : string[]) : string {
  if(leaveEmpty && leaveEmpty.length && leaveEmpty.includes(col))
    return '';
  let words = col.match(/.[^A-Z]*/g);
  if(!words)
    return "";
  let title = words.join(" ");
  let firstLetter = title[0].toUpperCase();
  return firstLetter + title.substring(1);

}
