import { Component, EventEmitter, Input, Output, ViewChild, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Character } from '../../model/character';
import { Skill } from '../../model/skill';
import { isCustomSkill, editCustomSkill, deleteCustomSkill, isProfessionalSkillSelected, removeProfessionalSkillSelection, ProfessionalSkillSelection } from '../../services/custom-skills';
import { ModalHandlerService } from '../../services/modal-handler.service';
import { CreateSkillComponent } from '../modals/create-skill/create-skill.component';

@Component({selector:'app-skill-actions',standalone:true,imports:[CommonModule,MatButtonModule,MatIconModule,MatMenuModule],templateUrl:'./skill-actions.component.html',styleUrls:['./skill-actions.component.scss']})
export class SkillActionsComponent implements OnDestroy {
  @Input() skill: Skill;
  @Input() character?: Character;
  @Input() selected = false;
  @Input() selectable = true;
  @Input() selection?: ProfessionalSkillSelection;
  @Output() choose = new EventEmitter<Skill>();
  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;
  menuPosition = {x:0,y:0};
  private holdTimer?: ReturnType<typeof setTimeout>;
  private pointerStart?: {x:number;y:number};
  private suppressClickUntil = 0;
  private returnFocus?: HTMLElement;
  constructor(private modals: ModalHandlerService, private ref: ChangeDetectorRef) {}
  get custom(): boolean { return !!this.character && isCustomSkill(this.skill); }
  get removable(): boolean { return !!this.character && !!this.selection && isProfessionalSkillSelected(this.character, this.skill, this.selection); }
  get hasActions(): boolean { return this.custom || this.removable; }
  activate(): void { if (Date.now() >= this.suppressClickUntil && !this.selected) this.choose.emit(this.skill); }
  openMenu(x: number, y: number, target: EventTarget | null): void {
    if (!this.hasActions) return;
    this.cancelHold(); this.returnFocus = target instanceof HTMLElement ? target.closest('button') || target : undefined;
    this.menuPosition={x,y}; this.ref.detectChanges(); this.trigger?.openMenu();
  }
  @HostListener('contextmenu',['$event']) contextMenu(event: MouseEvent): void {
    if (!this.hasActions) return;
    event.preventDefault(); event.stopPropagation(); this.suppressClickUntil=Date.now()+1000; this.openMenu(event.clientX,event.clientY,event.target);
  }
  @HostListener('keydown',['$event']) keydown(event: KeyboardEvent): void {
    if (this.hasActions && (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))) {
      event.preventDefault(); const box=(event.target as HTMLElement).getBoundingClientRect(); this.openMenu(box.left,box.bottom,event.target);
    }
  }
  @HostListener('pointerdown',['$event']) pointerDown(event: PointerEvent): void {
    if (!this.hasActions || event.pointerType === 'mouse') return;
    this.cancelHold(); this.pointerStart={x:event.clientX,y:event.clientY};
    this.holdTimer=setTimeout(()=>{this.suppressClickUntil=Date.now()+1000;this.openMenu(event.clientX,event.clientY,event.target);},550);
  }
  @HostListener('pointermove',['$event']) pointerMove(event: PointerEvent): void {
    if (this.pointerStart && Math.hypot(event.clientX-this.pointerStart.x,event.clientY-this.pointerStart.y)>10) this.cancelHold();
  }
  @HostListener('pointerup') @HostListener('pointercancel') @HostListener('pointerleave') cancelHold(): void {
    clearTimeout(this.holdTimer); this.holdTimer=undefined; this.pointerStart=undefined;
  }
  more(event: MouseEvent): void { event.stopPropagation(); const box=(event.currentTarget as HTMLElement).getBoundingClientRect(); this.openMenu(box.left,box.bottom,event.currentTarget); }
  edit(): void {
    if (!this.character) return;
    this.modals.open(CreateSkillComponent,{skill:this.skill,createdSkill:(edited:Skill)=>{editCustomSkill(this.character!,this.skill,edited);this.ref.markForCheck();}});
  }
  remove(): void { if (this.character) deleteCustomSkill(this.character,this.skill); }
  deselect(): void { if (this.character && this.selection) removeProfessionalSkillSelection(this.character,this.skill,this.selection); }
  restoreFocus(): void { this.returnFocus?.focus(); }
  ngOnDestroy(): void { this.cancelHold(); }
}
