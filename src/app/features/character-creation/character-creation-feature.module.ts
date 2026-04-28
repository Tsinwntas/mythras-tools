import { NgModule } from '@angular/core';

import { AppComponentsModule } from 'src/app/app-components.module';
import { CharacterCreationFeatureRoutingModule } from './character-creation-feature-routing.module';

@NgModule({
  imports: [AppComponentsModule, CharacterCreationFeatureRoutingModule],
})
export class CharacterCreationFeatureModule {}
