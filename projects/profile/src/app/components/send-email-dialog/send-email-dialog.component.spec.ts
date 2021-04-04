import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { SendEmailDialogComponent } from './send-email-dialog.component';

describe('SendEmailDialogComponent', () => {
    let component: SendEmailDialogComponent;
    let fixture: ComponentFixture<SendEmailDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SendEmailDialogComponent, TranslateMockPipe],
            imports: [ReactiveFormsModule],
            providers: [
                provideMockStore(),
                {
                    provide: DynamicDialogConfig,
                    useValue: {}
                },
                {
                    provide: DynamicDialogRef,
                    useValue: {}
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SendEmailDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
