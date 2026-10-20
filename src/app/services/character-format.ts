import { Character } from '../model/character';
import { Skill } from '../model/skill';
import { MysticPath } from '../model/mystic-path';
import { restoreLegacyCurrentHp } from './hit-points';
function record(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
// Fill missing defaults recursively. Arrays are data, never merge them by index.
// Preserve unrecognised properties so saves from other versions round-trip.
function restore(defaults: any, saved: any): any {
    if (!record(defaults))
        return saved === undefined ? defaults : saved;
    const result = { ...defaults };
    if (!record(saved))
        return result;
    for (const key of Object.keys(saved)) {
        if (['__proto__', 'prototype', 'constructor'].includes(key))
            continue;
        result[key] = record(defaults[key]) ? restore(defaults[key], saved[key]) : saved[key];
    }
    return result;
}
export function hydrateCharacter(saved: unknown): Character {
    if (!record(saved))
        throw new Error('Expected a character JSON object.');
    const defaults = new Character();
    const character = restore(defaults, saved) as Character;
    if (typeof character.id === 'number')
        character.id = String(character.id);
    if (!character.id || typeof character.id !== 'string')
        character.id = defaults.id;
    const skills = character.skills;
    const savedSkills = Array.isArray(skills.skills) ? skills.skills : [];
    skills.skills = savedSkills.filter(record).map((s: any) => {
        const base = defaults.skills.skills.find(d => d.name === s.name);
        return restore(base || new Skill(s.name || 'Custom skill', true, 'int', 'pow'), s);
    });
    for (const base of defaults.skills.skills) {
        if (!skills.skills.some(s => s.name === base.name))
            skills.skills.push(base);
    }
    for (const key of ['specialized', 'combatstyles', 'extraProfessionalCultureSkills', 'extraProfessionalCareerSkills']) {
        (skills as any)[key] = (Array.isArray((skills as any)[key]) ? (skills as any)[key] : [])
            .filter(record).map((s: any) => restore(new Skill(s.name || 'Custom skill', key !== 'combatstyles', ...(key === 'combatstyles' ? ['str', 'dex'] : ['int', 'pow'])), s));
    }
    // Old JSON duplicates references to selected skills. Reconnect identical copies,
    // otherwise editing a culture/career selection drifts away from the sheet.
    const sameSkill = (a: any, b: any) => [...new Set([...Object.keys(a), ...Object.keys(b)])].every(key => JSON.stringify(a[key]) === JSON.stringify(b[key]));
    for (const key of ['extraProfessionalCultureSkills', 'extraProfessionalCareerSkills']) {
        (skills as any)[key] = (skills as any)[key].map((s: Skill) => skills.skills.find(base => sameSkill(base, s)) || s);
    }
    if (skills.hobby)
        skills.hobby = [...skills.skills, ...skills.specialized, ...skills.combatstyles].find(s => sameSkill(s, skills.hobby)) || skills.hobby;
    skills.combatstyles.forEach(s => {
        s.traits = Array.isArray(s.traits) ? s.traits : [];
        s.weapons = record(s.weapons) ? s.weapons : {};
    });
    for (const key of ['passions', 'backgroundEvents', 'customNotes', 'customFactions']) {
        (character as any)[key] = Array.isArray((character as any)[key]) ? (character as any)[key] : [];
    }
    for (const key of ['folk', 'miracles', 'sorcery', 'custom']) {
        (character.magic as any)[key] = Array.isArray((character.magic as any)[key]) ? (character.magic as any)[key] : [];
    }
    character.magic.path = restore(new MysticPath(), character.magic.path);
    for (const key of ['augmentations', 'invocations', 'enhancements']) {
        if (!Array.isArray((character.magic.path as any)[key]))
            (character.magic.path as any)[key] = [];
    }
    for (const key of ['weapons', 'items']) {
        if (!Array.isArray((character.equipment as any)[key]))
            (character.equipment as any)[key] = [];
    }
    restoreLegacyCurrentHp(character);
    return character;
}
export function parseCharacterFile(text: string): Character[] {
    const parsed = JSON.parse(text.replace(/^\uFEFF/, ''));
    const entries = Array.isArray(parsed) ? parsed : record(parsed) && Array.isArray(parsed['characters']) ? parsed['characters'] : [parsed];
    if (!entries.length || entries.some((c: any) => !record(c) || !('skills' in c || 'name' in c || 'equipment' in c))) {
        throw new Error('This file does not contain a Mythras character. Choose a character JSON or library backup.');
    }
    return entries.map(hydrateCharacter);
}
export function downloadJson(value: unknown, filename: string): void {
    const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename.replace(/[<>:"/\\|?*]/g, '_');
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
