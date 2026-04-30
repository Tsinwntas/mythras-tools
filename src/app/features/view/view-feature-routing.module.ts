import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCharacterComponent } from 'src/app/pages/view-character/view-character.component';
import { ResponsiveCharacterViewerComponent } from 'src/app/pages/responsive-character-viewer/responsive-character-viewer.component';

const routes: Routes = [
  { path: '', component: ViewCharacterComponent },
  { path: 'responsive', component: ResponsiveCharacterViewerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFeatureRoutingModule {}
