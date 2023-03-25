import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Character } from 'src/app/model/character';
import { ModalInnerContent } from 'src/app/model/modal-inner-content';
import { TableComponent } from 'src/app/table-component/table.component';

@Component({
  selector: 'app-careers-modal',
  templateUrl: './careers-modal.component.html',
  styleUrls: ['./careers-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersModalComponent extends TableComponent implements ModalInnerContent {

  character : Character;

  constructor(private dialogRef: MatDialogRef<CareersModalComponent>) {
    super();    
  }

  getHeader(): string {
    return "Choose a Career";
  }

  getSources(): string {
    return "Mythras Core Rules 28";
  }

  setProps(props: any): void {
    this.character = props.character;
  }

  select(career : string){
    this.character.career = career;
    this.dialogRef.close();

  }

  override getTable(): any[] {
    return [
      {civilized: 'Agent', barbarian: 'Beast Handler', nomad: 'Beast Handler', primitive: 'Beast Handler'},
      {civilized: 'Alchemist', barbarian: 'Crafter', nomad: 'Crafter', primitive: 'Crafter'},
      {civilized: 'Beast Handler', barbarian: 'Entertainer', nomad: 'Fisher', primitive: 'Fisher'},
      {civilized: 'Courtesan', barbarian: 'Farmer', nomad: 'Herder', primitive: 'Hunter'},
      {civilized: 'Courtier', barbarian: 'Fisher', nomad: 'Hunter', primitive: 'Physician'},
      {civilized: 'Crafter', barbarian: 'Herder', nomad: 'Merchant', primitive: 'Sailor'},
      {civilized: 'Entertainer', barbarian: 'Hunter', nomad: 'Official', primitive: 'Scholar'},
      {civilized: 'Farmer', barbarian: 'Merchant', nomad: 'Physician', primitive: 'Scout'},
      {civilized: 'Fisher', barbarian: 'Miner', nomad: 'Priest', primitive: 'Shaman'},
      {civilized: 'Herder', barbarian: 'Mystic', nomad: 'Sailor', primitive: 'Thief'},
      {civilized: 'Hunter', barbarian: 'Official', nomad: 'Scholar', primitive: 'Warrior'},
      {civilized: 'Merchant', barbarian: 'Physician', nomad: 'Scout', primitive: ''},
      {civilized: 'Miner', barbarian: 'Priest', nomad: 'Shaman', primitive: ''},
      {civilized: 'Mystic', barbarian: 'Sailor', nomad: 'Thief', primitive: ''},
      {civilized: 'Official', barbarian: 'Scholar', nomad: 'Warrior', primitive: ''},
      {civilized: 'Physician', barbarian: 'Scout', nomad: '', primitive: ''},
      {civilized: 'Priest', barbarian: 'Shaman', nomad: '', primitive: ''},
      {civilized: 'Sailor', barbarian: 'Thief', nomad: '', primitive: ''}, 
      {civilized: 'Scholar', barbarian: 'Warrior', nomad: '', primitive: ''},
      {civilized: 'Scout', barbarian: '', nomad: '', primitive: ''},
      {civilized: 'Shaman', barbarian: '', nomad: '', primitive: ''},
      {civilized: 'Sorcerer', barbarian: '', nomad: '', primitive: ''},
      {civilized: 'Thief', barbarian: '', nomad: '', primitive: ''},
      {civilized: 'Warrior', barbarian: '', nomad: '', primitive: ''},
    ]
  }
}
