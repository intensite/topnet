import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';

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
      id: -1,
      name: '',
      telephone1: '',
      telephone2: '',
      email: '',
      birth_day: '',
      member_since: '',
      position_id: '',
      game_played: '',
      status: '',
      skill_points: '',
      player_notes: '',
    });


    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      console.log(`Player_id: ${id}`);

      this.playerService.getPlayerByID(id).subscribe(playerData => {
        this.form.patchValue(playerData);
      });
    });

    this.form.valueChanges.subscribe(console.log)
  }

  save() {

    // There must be a better way than this....
    // const player = {
    //   id: this.form.value.id,
    //   name: this.form.value.name,
    //   telephone1: this.form.value.telephone1,
    //   telephone2: this.form.value.telephone2,
    //   email: this.form.value.email,
    //   birth_day: this.form.value.birth_day,
    //   member_since: this.form.value.member_since,
    //   position_id: this.form.value.position_id,
    //   game_played: this.form.value.game_played,
    //   status: this.form.value.status,
    //   skill_points: this.form.value.skill_points,
    //   player_notes: this.form.value.player_notes,
    // };

    const player = this.form.value;
    delete player.hideRequired;
    delete player.floatLabel;

    // console.log(player);

    this.playerService.updatePlayer(player).subscribe(playerData => {
      // console.log(playerData);
      this.form.patchValue(playerData);
    });
  }

}
