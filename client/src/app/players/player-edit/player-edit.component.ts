import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  options: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      text1: '',
      text2: '',
      select1: '',
    });

    this.options.valueChanges.subscribe(console.log)
  }

}
