import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  playerEdit: FormGroup;

  constructor(private fb: FormBuilder, private playerService: PlayerService, private route: ActivatedRoute) {
    console.log('Inside constructor...');
  }

  ngOnInit() {
    // debugger;
    let player;

    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);

      this.playerService.getPlayerByID(id).subscribe(function (data) {
        console.log(data);
        player = data;


      });
    });
    // // (+) converts string 'id' to a number
    // .switchMap((params: Params) => this.yourProductService.getProductById(+params['id']))
    // .subscribe((product) => this.product = product);


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
    console.log('Inside ngOnInit...');


  }

}
