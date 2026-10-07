import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AppComponentsModule } from '../../app-components.module';

@Component({
  selector: 'app-combat-styles-page',
  standalone: true,
  imports: [RouterModule, MatButtonModule, AppComponentsModule],
  template: `
    <div class="app-shell">
      <main class="app-container">
        <header class="app-page-header app-card-surface">
          <div>
            <h1 class="app-page-title">Combat Styles</h1>
            <p class="app-page-subtitle">Browse by name or trait, culture, source and weapons. Mythras styles are shown by default.</p>
          </div>
          <button mat-raised-button color="accent" routerLink="/menu">Back to Main Menu</button>
        </header>
        <section class="app-card-surface app-section" aria-label="Combat styles browser">
          <app-all-combat-styles [browseOnly]="true"></app-all-combat-styles>
        </section>
      </main>
    </div>
  `,
  styles: [`
    main { padding-top: 24px; padding-bottom: 24px; }
    header { margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
    @media (max-width: 599px) {
      header > button { width: 100%; }
    }
  `]
})
export class CombatStylesPageComponent {}
