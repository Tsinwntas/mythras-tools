import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-attack-options',
  templateUrl: './attack-options.component.html',
  styleUrls: ['./attack-options.component.scss']
})
export class AttackOptionsComponent implements OnInit {

  type : string;

  constructor(private storage: AppStorageService) {}

  ngOnInit(): void {
    const type = this.storage.getRaw('attack-type');
    if(type) {
      this.type = type;
    }
  }

  private save(): void {
    if (this.type) {
      this.storage.setRaw('attack-type', this.type);
    }
  }

  melee(): void {
    this.type = 'melee';
    this.save();
  }

  ranged(): void {
    this.type = 'ranged';
    this.save();
  }

  magic(): void {
    this.type = 'magic';
    this.save();
  }
}
