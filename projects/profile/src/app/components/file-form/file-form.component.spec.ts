import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { FileFormComponent } from './file-form.component';

describe('FileFormComponent', () => {
    let component: FileFormComponent;
    let fixture: ComponentFixture<FileFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileFormComponent, TranslateMockPipe],
            imports: [ReactiveFormsModule],
            providers: [
                provideMockStore(),
                {
                    provide: TranslateService,
                    useValue: {
                        get: () => of([])
                    }
                },
                {
                    provide: MessageService,
                    useValue: {}
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
