import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ScheduleListTableDataSource } from './schedule-list-table-datasource';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'schedule-list-table',
  templateUrl: './schedule-list-table.component.html',
  styleUrls: ['./schedule-list-table.component.css']
})
export class ScheduleListTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ScheduleListTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['season_game_no', 'game_date', 'start_time', 'end_time',
    'location_name', 'home_team_name', 'away_team_name'];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.dataSource = new ScheduleListTableDataSource(this.gameService, this.paginator, this.sort);
  }
}
