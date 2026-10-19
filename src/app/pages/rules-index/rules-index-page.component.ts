import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import rulesData from './rules-index.data.json';

interface Rule {
  title: string;
  cat: string;
  status: string;
  page: string;
  section: string;
  tags: string[];
  summary: string;
  details: string[];
  note: string;
}

@Component({
  selector: 'app-rules-index-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './rules-index-page.component.html',
  styleUrls: ['./rules-index-page.component.scss'],
})
export class RulesIndexPageComponent {
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  readonly rules: Rule[] = rulesData;
  readonly categories = [...new Set(this.rules.map(rule => rule.cat))].sort();
  private readonly searchableRules = this.rules.map(rule => ({
    rule,
    text: [rule.title, rule.cat, rule.status, rule.page, rule.section,
      rule.summary, rule.note, ...rule.tags, ...rule.details].join(' ').toLowerCase(),
  }));

  query = '';
  category = '';
  filteredRules = this.rules;

  filterRules(): void {
    const terms = this.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    this.filteredRules = this.searchableRules
      .filter(({ rule, text }) => (!this.category || rule.cat === this.category)
        && terms.every(term => text.includes(term)))
      .map(({ rule }) => rule);
  }

  selectTag(tag: string): void {
    this.query = tag;
    this.filterRules();
    this.searchInput?.nativeElement.focus();
    this.searchInput?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  clearFilters(): void {
    this.query = '';
    this.category = '';
    this.filterRules();
  }

  isRaw(status: string): boolean {
    return /raw/i.test(status) && !/interpret|ruling/i.test(status);
  }

  @HostListener('document:keydown', ['$event'])
  focusSearch(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null;
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey
      && !target?.closest('input, textarea, select, [contenteditable], [role="combobox"]')) {
      event.preventDefault();
      this.searchInput?.nativeElement.focus();
    }
  }
}
