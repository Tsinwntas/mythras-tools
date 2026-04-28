import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from 'src/app/pages/menu/menu.component';

const routes: Routes = [{ path: '', component: MenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuFeatureRoutingModule {}
