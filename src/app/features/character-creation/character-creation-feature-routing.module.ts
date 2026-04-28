import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreationComponent } from 'src/app/pages/character-creation/character-creation.component';

const routes: Routes = [{ path: '', component: CharacterCreationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterCreationFeatureRoutingModule {}
