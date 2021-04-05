import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { RecycleBinComponent } from './recycle-bin.component';

describe('RecycleBinComponent', () => {
    let component: RecycleBinComponent;
    let fixture: ComponentFixture<RecycleBinComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecycleBinComponent, TranslateMockPipe],
            providers: [
                provideMockStore(),
                {
                    provide: MessageService,
                    useValue: {}
                },
                {
                    provide: ConfirmationService,
                    useValue: {}
                },
                {
                    provide: TranslateService,
                    useValue: {}
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RecycleBinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
