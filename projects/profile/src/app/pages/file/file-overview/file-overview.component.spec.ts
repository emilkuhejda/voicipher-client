import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { DialogService } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { FileOverviewComponent } from './file-overview.component';

describe('FileOverviewComponent', () => {
    let component: FileOverviewComponent;
    let fixture: ComponentFixture<FileOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileOverviewComponent, TranslateMockPipe],
            providers: [
                provideMockStore(),
                {
                    provide: ConfirmationService,
                    useValue: {}
                },
                {
                    provide: DialogService,
                    useValue: {}
                },
                {
                    provide: TranslateService,
                    useValue: {}
                }
            ],
            imports: [RouterTestingModule, TooltipModule, ChipModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
