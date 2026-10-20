import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character } from '../../model/character';
import { Skill } from '../../model/skill';
import { CombatStyle } from '../../model/combat-style';
import { CharacterWeapon } from '../../model/character-weapon';
import { getSkillTotal } from '../../services/character-service.service';
@Component({ selector: 'app-customization', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './customization.component.html', styleUrls: ['./customization.component.scss'] })
export class CustomizationComponent {
    @Input()
    character: Character;
    readonly characteristics = ['str', 'con', 'siz', 'dex', 'int', 'pow', 'cha'];
    readonly magicTypes = [{ key: 'folk', label: 'Folk magic' }, { key: 'sorcery', label: 'Sorcery' }, { key: 'miracles', label: 'Theism' }, { key: 'custom', label: 'Other magic / abilities' }];
    readonly armourLocations = [{ key: 'head', label: 'Head' }, { key: 'chest', label: 'Chest' }, { key: 'abdoment', label: 'Abdomen' }, { key: 'leftArm', label: 'Left arm' }, { key: 'rightArm', label: 'Right arm' }, { key: 'leftLeg', label: 'Left leg' }, { key: 'rightLeg', label: 'Right leg' }];
    readonly cults = [{ key: 'theistCult', label: 'Theist cult', detail: 'miracles' }, { key: 'animistCult', label: 'Animist cult', detail: 'spirits' }, { key: 'sorceryOrder', label: 'Sorcery order', detail: 'spells' }, { key: 'mysticalOrder', label: 'Mystical order', detail: 'paths' }, { key: 'brotherhood', label: 'Brotherhood', detail: 'notes' }];
    get customSkills(): any[] { return this.character.skills.specialized; }
    get factions(): any[] { return this.character.customFactions ||= []; }
    get notes(): any[] { return this.character.customNotes ||= []; }
    cult(key: string): any { return (this.character as any)[key]; }
    armour(key: string): any { return (this.character.equipment as any)[key]; }
    spells(key: string): any[] { return (this.character.magic as any)[key] ||= []; }
    total(skill: Skill): number { return getSkillTotal(this.character, skill); }
    addSkill(): void { const skill = new Skill('New professional skill', true, 'int', 'pow'); skill.force = true; skill.custom = true; this.customSkills.push(skill); }
    addStyle(): void { this.character.skills.combatstyles.push(Object.assign(new CombatStyle('New combat style', { source: 'Custom', weapons: { Melee: '' }, traits: [], selectedTrait: { name: 'Custom trait', trait: '' } }), { force: true })); }
    addWeapon(): void { this.character.equipment.weapons.push(Object.assign(new CharacterWeapon('New weapon', {}), { quantity: 1, enc: 0, cost: 0 })); }
    addItem(): void { this.character.equipment.items.push({ name: 'New item', quantity: 1, enc: 0, cost: 0 } as any); }
    remove(list: any[], index: number): void { list.splice(index, 1); }
}
