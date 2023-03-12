import { CombatFlowComponent } from './pages/combat-flow/combat-flow.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/combat', pathMatch: 'full'},
  { path: 'combat', component: CombatFlowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
