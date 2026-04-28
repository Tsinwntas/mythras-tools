import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  {
    path: 'menu',
    loadChildren: () =>
      import('./features/menu/menu-feature.module').then((m) => m.MenuFeatureModule),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./features/view/view-feature.module').then((m) => m.ViewFeatureModule),
  },
  {
    path: 'combat',
    loadChildren: () =>
      import('./features/combat/combat-feature.module').then((m) => m.CombatFeatureModule),
  },
  {
    path: 'character-creation',
    loadChildren: () =>
      import('./features/character-creation/character-creation-feature.module').then(
        (m) => m.CharacterCreationFeatureModule
      ),
  },
  {
    path: 'mythras-dnd-stat-block',
    loadChildren: () =>
      import('./features/mythras-dnd-stat-block/mythras-dnd-stat-block-feature.module').then(
        (m) => m.MythrasDndStatBlockFeatureModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
