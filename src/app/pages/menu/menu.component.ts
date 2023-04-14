import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router){}

  isAlreadyCreatingCharacter() : boolean {
    let c = localStorage['creation-character'];
    if(!c) return false;
    try {
      return JSON.parse(localStorage['creation-character']);
    } catch (e) {
      return false;
    }
  }

  newChararcter() {
    localStorage.removeItem('creation-character');
    localStorage.removeItem('creation-state');
    this.router.navigate(['/character-creation']);
  }

}
