import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RulesIndexPageComponent } from './rules-index-page.component';

describe('RulesIndexPageComponent', () => {
  let fixture: ComponentFixture<RulesIndexPageComponent>;
  let component: RulesIndexPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesIndexPageComponent, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(RulesIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('combines case-insensitive search terms with the category filter', () => {
    component.query = '  SHIELD   parry ';
    component.category = 'Defence';
    component.filterRules();
    expect(component.filteredRules.length).toBeGreaterThan(0);
    expect(component.filteredRules.every(rule => rule.cat === 'Defence')).toBeTrue();
    expect(component.filteredRules.some(rule => rule.title === 'Passive Blocking')).toBeTrue();
    expect(component.filteredRules.some(rule => rule.title === 'Parry: damage mitigation')).toBeFalse();
  });

  it('searches details and notes as well as titles', () => {
    component.query = 'dogpiled';
    component.filterRules();
    expect(component.filteredRules.map(rule => rule.title)).toEqual(['Concurrent unengaged movement']);
  });

  it('shows an empty state and restores the full index when filters are cleared', () => {
    component.query = 'no-such-rule-123';
    component.filterRules();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty').textContent).toContain('No matching rules');
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(0);
    component.clearFilters();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(component.rules.length);
  });

  it('uses a clicked tag as the search query and retains the category', () => {
    component.category = 'Defence';
    const tag = Array.from(fixture.nativeElement.querySelectorAll('.tag') as NodeListOf<HTMLButtonElement>)
      .find(button => button.textContent?.trim() === 'shield');
    tag!.click();
    fixture.detectChanges();
    expect(component.query).toBe('shield');
    expect(component.category).toBe('Defence');
    expect(component.filteredRules.length).toBeGreaterThan(0);
    expect(component.filteredRules.every(rule => rule.cat === 'Defence')).toBeTrue();
  });
});
