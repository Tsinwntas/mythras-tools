import { NgModule } from '@angular/core';

import { AppComponentsModule } from 'src/app/app-components.module';
import { CombatFeatureRoutingModule } from './combat-feature-routing.module';

@NgModule({
  imports: [AppComponentsModule, CombatFeatureRoutingModule],
})
export class CombatFeatureModule {}
