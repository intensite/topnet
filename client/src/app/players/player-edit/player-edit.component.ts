import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  playerEdit: FormGroup;

  constructor(private fb: FormBuilder, private playerService: PlayerService) {
    console.log('Inside constructor...');
  }

  ngOnInit() {
    // debugger;
    let player;

    this.playerService.getPlayerByID(1).subscribe(function (data) {
      console.log(data);
      player = data;
    });

    console.log('Inside ngOnInit...');

    this.playerEdit = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      playerName: '',
      phone1: '',
      phone2: '',
      email: '',
      birthDate: '',
      memberSince: '',
      position: '',
      gamesPlayed: '',
      playerStatus: '',
      skillPoints: '',
      notes: '',
    });

    this.playerEdit.valueChanges.subscribe(console.log)
  }

}
