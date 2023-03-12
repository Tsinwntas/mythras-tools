import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attack-options',
  templateUrl: './attack-options.component.html',
  styleUrls: ['./attack-options.component.scss']
})
export class AttackOptionsComponent implements OnInit {

  type : string;

  
  ngDoCheck() {
    localStorage['attack-type'] = this.type;
  }

  ngOnInit(): void {
    if(localStorage['attack-type'])
      this.type = localStorage['attack-type'];
  }

  melee(): void {
    this.type = 'melee';
  }

  ranged(): void {
    this.type = 'ranged';
  }

  magic(): void {
    this.type = 'magic';
  }
}
