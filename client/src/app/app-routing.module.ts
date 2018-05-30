import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { PlayerListComponent } from './player-list/player-list.component';
// import { PlayerListComponent } from './player-list.component';

const routes: Routes = [
  { path: '', component: PlayerListComponent  },
  { path: 'players', component: PlayerListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
