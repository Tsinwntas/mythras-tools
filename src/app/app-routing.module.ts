import { CombatFlowComponent } from './pages/combat-flow/combat-flow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreationComponent } from './pages/character-creation/character-creation.component';

const routes: Routes = [
  {path: '', redirectTo: '/combat', pathMatch: 'full'},
  { path: 'combat', component: CombatFlowComponent },
  { path: 'character-creation', component: CharacterCreationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
