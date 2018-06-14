import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { PlayerListComponent } from './players/player-list/player-list.component';
 import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';
// import { PlayerListComponent } from './player-list.component';

const routes: Routes = [
  // { path: '', component: PlayerListComponent  },
  { path: 'players', component: PlayerListComponent },
  { path: 'schedule', component: ScheduleListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
