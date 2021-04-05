import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeItemComponent } from './transcribe-item.component';

describe('TranscribeItemComponent', () => {
  let component: TranscribeItemComponent;
  let fixture: ComponentFixture<TranscribeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscribeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscribeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
