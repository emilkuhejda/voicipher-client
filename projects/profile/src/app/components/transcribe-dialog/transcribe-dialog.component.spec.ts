import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { TranscribeDialogComponent } from './transcribe-dialog.component';

describe('TranscribeDialogComponent', () => {
    let component: TranscribeDialogComponent;
    let fixture: ComponentFixture<TranscribeDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TranscribeDialogComponent, TranslateMockPipe],
            providers: [
                provideMockStore(),
                {
                    provide: DynamicDialogConfig,
                    useValue: {
                        data: {
                            audioFile: {
                                transcriptionStartTimeTicks: 0,
                                transcriptionEndTimeTicks: 0,
                                totalTimeTicks: 0
                            }
                        }
                    }
                },
                {
                    provide: DynamicDialogRef,
                    useValue: {}
                },
                provideMockStore(),
                {
                    provide: MessageService,
                    useValue: {}
                },
                provideMockStore(),
                {
                    provide: TranslateService,
                    useValue: {}
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
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
