import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CombatFlowComponent } from 'src/app/pages/combat-flow/combat-flow.component';

const routes: Routes = [{ path: '', component: CombatFlowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CombatFeatureRoutingModule {}
