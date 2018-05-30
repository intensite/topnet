
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListTableComponent } from './player-list-table.component';

describe('PlayerListTableComponent', () => {
  let component: PlayerListTableComponent;
  let fixture: ComponentFixture<PlayerListTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
