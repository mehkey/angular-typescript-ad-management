import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignCreateComponent} from './campaign-create/campaign-create.component'

const routes: Routes = [
  { path: '', redirectTo: '/create-campaign', pathMatch: 'full' },
  { path: 'create-campaign', component: CampaignCreateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
