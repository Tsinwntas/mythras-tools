import { Character } from 'src/app/model/character';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss'],
})
export class CharacterPreviewComponent {
  character: Character;
  hideDisclaimer: boolean;
  load: boolean;
  loading: boolean;


  constructor(
    private detector: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  refresh() {
    this.load = false;
    this.loading = true;
    this.detector.detectChanges();
    setTimeout(() => {
      this.load = true;
      this.loading = false;
    }, 1000);
  }

  print() {
    let title = (document as any).title;
    (document as any).title = this.character.name;
    (window as any).print();
    (document as any).title = title;

  }

  generateDownloadJsonUri() {
    var theJSON = JSON.stringify(this.character);
    var uri = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
    );
    return uri;
  }
}
