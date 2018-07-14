import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  form: FormGroup;
  player: Observable<any>;

  constructor(private fb: FormBuilder, private playerService: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    // debugger;

    this.form = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      name: '',
      telephone1: '',
      telephone2: '',
      email: '',
      birth_day: '',
      member_since: '',
      position: '',
      game_played: '',
      status: '',
      skill_points: '',
      player_notes: '',
    });


    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      console.log(`Player_id: ${id}`);

      this.playerService.getPlayerByID(id).subscribe(playerData => {
        // console.log(playerData);
        this.form.patchValue(playerData);
      });
    });

    this.form.valueChanges.subscribe(console.log)
    console.log('Inside ngOnInit...');


  }

}
