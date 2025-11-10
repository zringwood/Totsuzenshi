import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whistle } from './whistle';

describe('Whistle', () => {
  let component: Whistle;
  let fixture: ComponentFixture<Whistle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whistle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whistle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
