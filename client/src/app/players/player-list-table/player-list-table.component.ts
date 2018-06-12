import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlayerListTableDataSource } from './player-list-table-datasource';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'player-list-table',
  templateUrl: './player-list-table.component.html',
  styleUrls: ['./player-list-table.component.css']
})
export class PlayerListTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'position', 'skills', 'games', 'status'];

  dataSource = new PlayerListTableDataSource(this.playerService, this.paginator, this.sort);
  // dataSource = new PlayerListTableDataSource(this.playerService);

  constructor (private playerService: PlayerService) { }

  ngOnInit() {
    // this.dataSource = new PlayerListTableDataSource(this.paginator, this.sort);
  }
}
