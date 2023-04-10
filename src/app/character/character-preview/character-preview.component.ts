import { Character } from 'src/app/model/character';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss']
})
export class CharacterPreviewComponent {
  character : Character;
  load: boolean;
  loading: boolean;

  constructor(private detector: ChangeDetectorRef){}

  refresh(){
    this.load= false;
    this.loading = true;
    this.detector.detectChanges();
    setTimeout(()=>{this.load = true;this.loading=false;}, 1000);
  }
}
