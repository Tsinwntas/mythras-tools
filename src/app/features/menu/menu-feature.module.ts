import { NgModule } from '@angular/core';

import { MenuComponent } from 'src/app/pages/menu/menu.component';
import { MenuFeatureRoutingModule } from './menu-feature-routing.module';

@NgModule({
  imports: [MenuComponent, MenuFeatureRoutingModule],
})
export class MenuFeatureModule {}
