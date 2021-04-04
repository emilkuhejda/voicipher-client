import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { FileEditComponent } from './file-edit.component';

describe('FileEditComponent', () => {
    let component: FileEditComponent;
    let fixture: ComponentFixture<FileEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileEditComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            providers: [provideMockStore()],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
