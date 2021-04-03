import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { FileOverviewComponent } from './file-overview.component';

describe('FileOverviewComponent', () => {
    let component: FileOverviewComponent;
    let fixture: ComponentFixture<FileOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileOverviewComponent, TranslateMockPipe],
            providers: [provideMockStore()],
            imports: [RouterTestingModule, TooltipModule, ChipModule]
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
