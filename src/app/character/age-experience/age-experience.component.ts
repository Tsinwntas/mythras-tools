import { CombatStyle } from 'src/app/model/combat-style';
import { getSkillTotal } from 'src/app/services/character-service.service';
import { Skill } from 'src/app/model/skill';
import { orZero } from 'src/app/services/common.service';
import { Character } from 'src/app/model/character';
import { Component } from '@angular/core';

@Component({
  selector: 'app-age-experience',
  templateUrl: './age-experience.component.html',
  styleUrls: [
    '../stats/stats.component.scss',
    '../culture/culture.component.scss',
    './age-experience.component.scss',
  ],
})
export class AgeExperienceComponent {
  ageTable: any[] = [
    {
      ageCategory: 'Young',
      ageRange: '11-16',
      bonusSkillPoints: 100,
      maximumSkillIncrease: 10,
      backgroundEventRolls: 0,
    },
    {
      ageCategory: 'Young-Adult',
      ageRange: '17-27',
      bonusSkillPoints: 150,
      maximumSkillIncrease: 15,
      backgroundEventRolls: 1,
    },
    {
      ageCategory: 'Adult',
      ageRange: '28-43',
      bonusSkillPoints: 200,
      maximumSkillIncrease: 20,
      backgroundEventRolls: 2,
    },
    {
      ageCategory: 'Middle-Aged',
      ageRange: '44-64',
      bonusSkillPoints: 250,
      maximumSkillIncrease: 25,
      backgroundEventRolls: 3,
    },
    {
      ageCategory: 'Old',
      ageRange: '65-80',
      bonusSkillPoints: 300,
      maximumSkillIncrease: 30,
      backgroundEventRolls: 4,
    },
  ];
  character: Character;

  getCharacerAgeCategory(): any {
    return this.ageTable.find((a) => {
      if (!this.character.age) return false;
      let ageRange = a.ageRange.split('-');
      return (
        parseInt(ageRange[0]) <= this.character.age &&
        parseInt(ageRange[1]) >= this.character.age
      );
    });
  }

  getPointsLeft(): number {
    return (
      this.getMaxPoints() -
      this.character.skills.skills
        .map((skill) => orZero(skill.extraBonus))
        .concat(
          this.character.skills.combatstyles.map((skill) =>
            orZero(skill.extraBonus)
          )
        )
        .concat(
          this.character.skills.specialized.map((skill) =>
            orZero(skill.extraBonus)
          )
        )
        .concat(
          this.character.skills.hobby
            ? [orZero(this.character.skills.hobby.extraBonus)]
            : [0]
        )
        .reduce((a, b) => a + b, 0)
    );
  }

  getMaxPoints(): number {
    let age = this.getCharacerAgeCategory();
    return age
      ? age.bonusSkillPoints
      : this.character.age && this.character.age > 11
      ? 300
      : 0;
  }

  getMaxIncrease(): number {
    let age = this.getCharacerAgeCategory();
    return age
      ? age.maximumSkillIncrease
      : this.character.age && this.character.age > 11
      ? 30
      : 0;
  }

  resetSkills() {
    this.character.skills.skills.forEach((skill) => (skill.extraBonus = 0));
    this.character.skills.combatstyles.forEach(
      (skill) => (skill.extraBonus = 0)
    );
    if (this.character.skills.specialized)
      this.character.skills.specialized.forEach(
        (skill) => (skill.extraBonus = 0)
      );
    if (this.character.skills.hobby) this.character.skills.hobby.extraBonus = 0;
  }

  getSkill(skill: Skill): number {
    return getSkillTotal(this.character, skill);
  }

  getCombatStyles(): CombatStyle[] {
    return this.character.skills.combatstyles
      .filter((style) => style.cultureBonus || style.careerBonus)
      .concat(
        this.character.skills.hobby && this.isHobbyCombatStyle()
          ? [this.character.skills.hobby as CombatStyle]
          : []
      );
  }

  getStandardSkills(): Skill[] {
    return this.character.skills.skills
      .filter((skill) => !skill.professional)
      .sort((skill1, skill2) => skill1.name.localeCompare(skill2.name));
  }

  getProfessionalSkills(): Skill[] {
    return this.character.skills.skills
      .filter(
        (skill) =>
          skill.professional && (skill.cultureBonus || skill.careerBonus)
      )
      .concat(
        this.character.skills.specialized.filter(
          (skill) => skill.cultureBonus || skill.careerBonus
        )
      )
      .concat(
        this.character.skills.hobby && !this.isHobbyCombatStyle()
          ? [this.character.skills.hobby]
          : []
      )
      .sort((skill1, skill2) => skill1.name.localeCompare(skill2.name));
  }

  isHobbyCombatStyle(): boolean {
    return (this.character.skills.hobby as any)['traits'];
  }
}
