import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TextFieldModule } from '@angular/cdk/text-field';
import { Character } from './app/model/character';

class MatDialogStub {
  open() {
    return {
      afterClosed: () => ({
        subscribe: () => {},
      }),
    };
  }
}

class DummyModalContentComponent {
  getHeader(): string {
    return '';
  }
  setProps(_props: unknown): void {}
}

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      NoopAnimationsModule,
      RouterTestingModule,
      TextFieldModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
    ],
    providers: [
      { provide: MatDialog, useClass: MatDialogStub },
      { provide: MatDialogRef, useValue: { close: () => {} } },
      {
        provide: MAT_DIALOG_DATA,
        useValue: { component: DummyModalContentComponent, props: {} },
      },
    ],
    schemas: [NO_ERRORS_SCHEMA],
  });
});

const originalCreateComponent = TestBed.createComponent.bind(TestBed);

function ensureDefaultState(instance: any, componentName: string): void {
  if (
    [
      'AgeComponent',
      'AgeExperienceComponent',
      'BackgroundDetailsComponent',
      'BackgroundEventsComponent',
      'BonusSkillComponent',
      'CareerComponent',
      'CombatStylesComponent',
      'ConceptComponent',
      'CultComponent',
      'CultureComponent',
      'DetailsComponent',
      'EquipmentComponent',
      'FamilyComponent',
      'HeightWeightComponent',
      'PassionsComponent',
      'SkillsComponent',
      'SocialClassComponent',
      'StartingMagicComponent',
      'StatsComponent',
      'CharacterPdfComponent',
    ].includes(componentName)
  ) {
    if (!instance.character) {
      instance.character = new Character();
    }
  }

  if (componentName === 'StylesTableComponent' && !instance.styles) {
    instance.styles = [];
  }
  if (componentName === 'StyleFiltersComponent' && !instance.filters) {
    instance.filters = { name: '', culture: '', sources: [], weapons: [], specials: [] };
  }
  if (componentName === 'WeaponEditComponent' && !instance.weapon) {
    instance.weapon = { name: '' };
  }
  if (componentName === 'ItemEditComponent' && !instance.item) {
    instance.item = { name: '' };
  }
  if (componentName === 'EquipmentEditComponent' && !instance.equipment) {
    instance.equipment = {
      baseMaterial: '',
      material: '',
      construction: '',
      type: '',
      name: '',
      ap: 0,
      enc: 0,
      hp: 0,
      special: '',
    };
  }
  if (componentName === 'ProfessionalSkillsComponent' && !instance.skills) {
    instance.skills = [];
  }
  if (componentName === 'CreateSkillComponent' && !instance.skill) {
    instance.skill = { name: '', base: 'str', skills: ['str'] };
  }
  if (componentName === 'SpecialEffectsComponent' && !instance.effect) {
    instance.effect = 'Impale';
  }
  if (componentName === 'TraitsComponent' && !instance.trait) {
    instance.trait = { trait: { name: '', trait: '' }, source: '' };
  }
  if (componentName === 'InitiativeNotesComponent' && !instance.round) {
    instance.round = { round: 1 };
  }
  if (componentName === 'InitiativeNotesComponent' && !(window as any).loadingSubject) {
    (window as any).loadingSubject = { next: () => {} };
  }
}

TestBed.createComponent = function <T>(component: any): ComponentFixture<T> {
  const fixture = originalCreateComponent<T>(component);
  ensureDefaultState(fixture.componentInstance as any, component.name);
  return fixture;
};
