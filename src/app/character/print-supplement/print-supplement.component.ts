import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../model/character';
import { getSkillTotal } from '../../services/character-service.service';
@Component({ selector: 'app-print-supplement', standalone: true, imports: [CommonModule], templateUrl: './print-supplement.component.html', styleUrls: ['./print-supplement.component.scss'] })
export class PrintSupplementComponent {
    @Input()
    character: Character;
    clean(value: unknown): string { return String(value ?? '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, ''); }
    get entries(): {
        heading: string;
        text: string;
    }[] {
        const c = this.character, entries: {
            heading: string;
            text: string;
        }[] = [];
        const add = (heading: string, text: unknown) => { if (text && String(text).trim())
            entries.push({ heading, text: this.clean(text) }); };
        // Complete flowing copy: fixed sheet slots can never hide additional entries.
        const skills = [...c.skills.skills, ...c.skills.specialized, ...c.skills.extraProfessionalCultureSkills, ...c.skills.extraProfessionalCareerSkills, ...(c.skills.hobby ? [c.skills.hobby] : [])];
        const learned = skills.filter((s, i, a) => s && a.findIndex(other => other?.name === s.name) === i && (s.force || s.cultureBonus || s.careerBonus || s.extraBonus));
        if (learned.length)
            add('Skills', learned.map(s => s.name + ': ' + getSkillTotal(c, s) + '%').join('\n'));
        for (const style of c.skills.combatstyles) {
            add('Combat style: ' + style.name, [getSkillTotal(c, style) + '%', ...Object.entries(style.weapons || {}).map(([key, value]) => key + ': ' + value), style.selectedTrait?.name, style.selectedTrait?.trait].filter(Boolean).join('\n'));
        }
        for (const type of ['folk', 'sorcery', 'miracles', 'custom'])
            for (const spell of (c.magic as any)[type] || [])
                add(spell.name + ' (' + type + ')', [spell.tags, spell.description].filter(Boolean).join('\n'));
        add('Spirits & bindings', c.magic.spirits);
        add('Magical abilities', c.magic.abilities);
        add('Mystic path', c.magic.path?.path);
        for (const augmentation of c.magic.path?.augmentations || [])
            add('Augmentation', augmentation);
        for (const spell of [...(c.magic.path?.invocations || []), ...(c.magic.path?.enhancements || [])])
            add(spell.name, [spell.tags, spell.description].filter(Boolean).join('\n'));
        for (const weapon of c.equipment.weapons)
            add('Weapon: ' + weapon.name, [
                'Quantity: ' + (weapon.quantity ?? 1), weapon.damage && 'Damage: ' + weapon.damage, weapon.size && 'Size: ' + weapon.size, weapon.reach && 'Reach: ' + weapon.reach,
                weapon.range && 'Range: ' + weapon.range, weapon.ap != null && 'AP: ' + weapon.ap, weapon.hp != null && 'HP: ' + weapon.hp,
                'ENC: ' + (weapon.enc || 0), 'Cost: ' + (weapon.cost || 0), weapon.extra, ...(weapon.traits || []).map(t => t.name + ': ' + t.description)
            ].filter(v => v !== false && v != null && v !== '').join('\n'));
        for (const item of c.equipment.items)
            add('Item: ' + item.name, ['Quantity: ' + (item.quantity ?? 1), 'ENC: ' + (item.enc || 0), 'Cost: ' + (item.cost || 0), item.description].filter(Boolean).join('\n'));
        for (const key of ['theistCult', 'animistCult', 'sorceryOrder', 'mysticalOrder', 'brotherhood']) {
            const cult = (c as any)[key];
            if (cult?.name)
                add('Membership: ' + cult.name, Object.entries(cult).filter(([k, v]) => k !== 'name' && v).map(([k, v]) => k + ': ' + v).join('\n'));
        }
        for (const faction of c.customFactions || [])
            add('Organization: ' + faction.name, [faction.rank, faction.description].filter(Boolean).join('\n'));
        for (const note of c.customNotes || [])
            add(note.name, note.description);
        for (const key of ['concept', 'background', 'backstory', 'backgroundOverall', 'contactsOverall', 'moneyOverall', 'cultOverall', 'extraInformation'])
            add(({ backgroundOverall: 'Background', contactsOverall: 'Contacts', moneyOverall: 'Money & resources', cultOverall: 'Cults & brotherhoods', extraInformation: 'Additional information' } as any)[key] || key, (c as any)[key]);
        for (const passion of (c.passions || []).filter(p => p.passion?.trim()))
            add('Passion', passion.passion + ' ' + (passion.modifierNumber ?? '') + '%');
        return entries;
    }
}
