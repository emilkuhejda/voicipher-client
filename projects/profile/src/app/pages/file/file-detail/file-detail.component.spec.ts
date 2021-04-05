import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { FileDetailComponent } from './file-detail.component';

describe('FileDetailComponent', () => {
    let component: FileDetailComponent;
    let fixture: ComponentFixture<FileDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileDetailComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            providers: [
                provideMockStore(),
                {
                    provide: DialogService,
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
        fixture = TestBed.createComponent(FileDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
