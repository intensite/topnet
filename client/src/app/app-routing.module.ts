import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { PlayerListComponent } from './players/player-list/player-list.component';
 import { PlayerEditComponent } from './players/player-edit/player-edit.component';
 import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';
// import { PlayerListComponent } from './player-list.component';

const routes: Routes = [
  // { path: '', component: PlayerListComponent  },
  { path: 'players', component: PlayerListComponent },
  { path: 'players/:id', component: PlayerEditComponent },
  { path: 'schedule', component: ScheduleListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
