import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryProfileComponent } from './country-profile/country-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndiaStateProfileComponent } from './india-state-profile/india-state-profile.component';
import { IndiaStatsComponent } from './india-stats/india-stats.component';
import { ListViewComponent } from './list-view/list-view.component';
import { PrecautionsComponent } from './precautions/precautions.component';
import { TrendingVideosComponent } from './trending-videos/trending-videos.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // children: [
    //   {
    //     path: 'country/profile',
    //     component: CountryProfileComponent
    //   }
    // ]
  },
  {
    path: '',
    redirectTo: 'list/view',
    pathMatch: 'full'
  },
  {
    path: 'country/profile',
    component: CountryProfileComponent
  },
  {
    path: 'list/view',
    component: ListViewComponent
  },
  {
    path: 'trending/videos',
    component: TrendingVideosComponent
  },
  {
    path: 'precautions',
    component: PrecautionsComponent
  },
  {
    path: 'india/stats',
    component: IndiaStatsComponent
  },
  {
    path: 'india/state/profile',
    component: IndiaStateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
