import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';
import { RoundConfidencePipe } from '../pipes/round-confidence.pipe';

import { TranscribeItemComponent } from './transcribe-item.component';

describe('TranscribeItemComponent', () => {
    let component: TranscribeItemComponent;
    let fixture: ComponentFixture<TranscribeItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TranscribeItemComponent, TranslateMockPipe, RoundConfidencePipe],
            providers: [provideMockStore()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
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
