import { CombatFlowComponent } from './pages/combat-flow/combat-flow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreationComponent } from './pages/character-creation/character-creation.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ViewCharacterComponent } from './pages/view-character/view-character.component';
import { MythrasToDndMonsterBlockComponent } from './pages/mythras-to-dnd-monster-block/mythras-to-dnd-monster-block.component';

const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'menu', component: MenuComponent },
  { path: 'view', component: ViewCharacterComponent },
  { path: 'combat', component: CombatFlowComponent },
  { path: 'character-creation', component: CharacterCreationComponent },
  { path: 'mythras-dnd-stat-block', component: MythrasToDndMonsterBlockComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
