import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MythrasToDndMonsterBlockComponent } from 'src/app/pages/mythras-to-dnd-monster-block/mythras-to-dnd-monster-block.component';

const routes: Routes = [{ path: '', component: MythrasToDndMonsterBlockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MythrasDndStatBlockFeatureRoutingModule {}
