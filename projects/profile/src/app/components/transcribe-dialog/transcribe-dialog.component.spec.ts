import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeDialogComponent } from './transcribe-dialog.component';

describe('TranscribeDialogComponent', () => {
  let component: TranscribeDialogComponent;
  let fixture: ComponentFixture<TranscribeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranscribeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranscribeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
