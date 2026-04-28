import { NgModule } from '@angular/core';

import { AppComponentsModule } from 'src/app/app-components.module';
import { MythrasDndStatBlockFeatureRoutingModule } from './mythras-dnd-stat-block-feature-routing.module';

@NgModule({
  imports: [AppComponentsModule, MythrasDndStatBlockFeatureRoutingModule],
})
export class MythrasDndStatBlockFeatureModule {}
