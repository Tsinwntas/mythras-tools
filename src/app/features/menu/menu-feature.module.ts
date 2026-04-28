import { NgModule } from '@angular/core';

import { AppComponentsModule } from 'src/app/app-components.module';
import { MenuFeatureRoutingModule } from './menu-feature-routing.module';

@NgModule({
  imports: [AppComponentsModule, MenuFeatureRoutingModule],
})
export class MenuFeatureModule {}
