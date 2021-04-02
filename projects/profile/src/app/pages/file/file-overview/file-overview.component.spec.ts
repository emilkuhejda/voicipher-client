import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FileOverviewComponent } from './file-overview.component';

describe('FileOverviewComponent', () => {
    let component: FileOverviewComponent;
    let fixture: ComponentFixture<FileOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileOverviewComponent],
            providers: [provideMockStore()]
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
