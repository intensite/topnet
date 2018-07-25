import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRosterComponent } from './game-roster.component';

describe('GameRosterComponent', () => {
  let component: GameRosterComponent;
  let fixture: ComponentFixture<GameRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
