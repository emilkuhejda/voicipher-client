import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { FileCreateComponent } from './file-create.component';

describe('FileCreateComponent', () => {
    let component: FileCreateComponent;
    let fixture: ComponentFixture<FileCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileCreateComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
