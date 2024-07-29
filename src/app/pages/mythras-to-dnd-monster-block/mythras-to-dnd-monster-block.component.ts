import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import convert from 'src/app/services/monster-to-my-app-converter';

@Component({
  selector: 'app-mythras-to-dnd-monster-block',
  templateUrl: './mythras-to-dnd-monster-block.component.html',
  styleUrls: ['./mythras-to-dnd-monster-block.component.scss']
})
export class MythrasToDndMonsterBlockComponent {

  mythrasStatBlock : string = "";
  textBlockSplit : string[] = [];
  count = 0;
  parsed : any = {};
  beforeSkillInfo : string[] = [];
  name: string = "";
  extraAbilities: string = "";
  hpOvewrite: number | string;
  acOvewrite: number | string;
  prof: number | string;
  fileUrl: any;

  constructor(
    private sanitizer: DomSanitizer){}


  getLine(check: string): string {
    while(this.count<=this.textBlockSplit.length){
      if(this.textBlockSplit[this.count].startsWith(check)){
        return this.textBlockSplit[this.count];
      }
      this.count++;
    }
    return "Not found";
  }

  tryReturn(action: ()=>any): any {
    try{
      return action();
    } catch(err: any){
      return "Error: " + err.message;
    }
  }

  isMythrasStatBlockIsInitialised() : boolean {
    return this.mythrasStatBlock.length > 0 && this.initStats();
  }

  initStats(): boolean {
    this.textBlockSplit = this.mythrasStatBlock.split("\n");
    this.count = 0;
    this.parsed = {};
    return this.textBlockSplit.length > 0;
  }

  getByCheck(check: string): string {
    return this.parsed[check] = this.tryReturn(()=>this.getLine(check).split(" ")[1]);
  }

  calculateHP(): number {
    return this.tryReturn(()=>{
      this.getLine("1D20	Location");
      this.count++;
      let hp = 0;
      let ac = 0;
      let joints = 0;
      while(this.textBlockSplit[this.count][0].match(/[0-9]/)){
        let line = this.textBlockSplit[this.count].split(/[ \t]/);
        let achp = line[line.length - 1].split(/[/]/);
        ac += parseInt(achp[0]);
        joints++;
        hp += parseInt(achp[1]);
        this.count++;
      }
      this.figureOutAc(ac, joints);
      return this.parsed['finalHP'] = (this.hpOvewrite != undefined && this.hpOvewrite != ""? this.hpOvewrite : this.parsed["HP"] = hp) ;
    })
  }

  figureOutAc(ac: number, joints : number): void {
    let averageAc = Math.floor(ac/joints);
    if(averageAc < 3)
      averageAc += this.getMod(this.parsed["DEX:"]);
    else if (averageAc < 6)
      averageAc += Math.min(this.getMod(this.parsed["DEX:"]), 2);
    if(this.mythrasStatBlock.match(/[^\n]*[sS]hield[ \t]+.[ \t]+.[ \t]/))
      averageAc += 2;
    this.parsed["AC"] = 10 + averageAc;
  }

  getMod(skill : number){
      return Math.floor((skill - 10) / 2);
  }

  getSkills() : string {
    let temp = this.count;
    return this.tryReturn(()=>{
      let skills = this.getLine("Skills:").split(": ")[1];
      this.beforeSkillInfo = this.textBlockSplit.slice(temp,this.count);
      return this.parsed['skills'] = skills;
    });
  }

  getRestOfAbilities() : string[] {
    this.count++;
    let temp = this.count;
    return this.tryReturn(()=>{
      this.getLine("Weapon");
      return this.parsed['abilities'] = this.getProficiencyTextAsArray().concat(this.getExtraAbilities()).concat(this.beforeSkillInfo).concat(this.textBlockSplit.slice(temp,this.count));
    })
  }

  getProficiencyTextAsArray() : string[] { 
    return this.prof!=undefined && this.prof != "" ? ["Proficiency: "+this.prof] : [];
  }

  getExtraAbilities() : string[] {
    return this.extraAbilities!=undefined && this.extraAbilities != "" ? this.extraAbilities.split("\n") : [];
  }

  getAttacks() : string[] {
    this.count++;
    return this.tryReturn(()=>{
      return this.parsed['attacks'] = this.textBlockSplit.slice(this.count).map(line=>{
        let weapon = line.match(/[^0-9]*[ \t]+.[ \t]/)//[0].split(/[ \t]+.[ \t]/)[0] +
        // " | " +
        let dmg = line.match(/[+-]?[0-9]+([d][0-9]+)?([+-][0-9a-z]+)*/);
        return (weapon? weapon[0].split(/[ \t]+.[ \t]/)[0] : "Can't parse weapon") + " | " + (dmg ? dmg[0] : "Can't parse dmg");
      })
    })
  } 

  generateDownloadXmlLink() {
    if(!this.parsed['STR:'])
      return;
    this.parsed['name'] = this.name.trim();

    const data = convert(this.parsed);
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
    return this.fileUrl;
  }

}
