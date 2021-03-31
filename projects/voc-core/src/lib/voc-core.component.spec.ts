import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocCoreComponent } from './voc-core.component';

describe('VocCoreComponent', () => {
  let component: VocCoreComponent;
  let fixture: ComponentFixture<VocCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
