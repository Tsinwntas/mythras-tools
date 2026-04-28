import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCharacterComponent } from 'src/app/pages/view-character/view-character.component';

const routes: Routes = [{ path: '', component: ViewCharacterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFeatureRoutingModule {}
