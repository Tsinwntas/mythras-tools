import { Injectable } from '@angular/core';
import CAREERS from '../jsons/careers.json';

@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor() { }

  getCareers() {
    return CAREERS;
  }
}

export const Careers = CAREERS;

// .replace(/[\n]/g," ").split(/[ ]*_[ ]*/g).map(s=>{
//   let split= s.split(/[ ]*[*][ ]*/g);
//   return {career:split[0],standard:split[1].split(/[ ]*[,][ ]*/g),professional:split[2].split(/[ ]*[,][ ]*/g)}
// })