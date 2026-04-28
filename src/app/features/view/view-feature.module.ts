import { NgModule } from '@angular/core';

import { AppComponentsModule } from 'src/app/app-components.module';
import { ViewFeatureRoutingModule } from './view-feature-routing.module';

@NgModule({
  imports: [AppComponentsModule, ViewFeatureRoutingModule],
})
export class ViewFeatureModule {}
