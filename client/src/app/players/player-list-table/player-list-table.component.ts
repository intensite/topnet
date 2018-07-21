import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlayerListTableDataSource } from './player-list-table-datasource';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'player-list-table',
  templateUrl: './player-list-table.component.html',
  styleUrls: ['./player-list-table.component.css']
})
export class PlayerListTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'position', 'skills', 'games', 'status'];

  dataSource : PlayerListTableDataSource;
  // dataSource = new PlayerListTableDataSource(this.playerService);

  constructor (private playerService: PlayerService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.dataSource = new PlayerListTableDataSource(this.playerService, this.paginator, this.sort);
    this.cdr.detectChanges();
  }
}
