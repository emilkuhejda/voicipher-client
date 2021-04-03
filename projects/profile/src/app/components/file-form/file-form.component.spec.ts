import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { FileFormComponent } from './file-form.component';

describe('FileFormComponent', () => {
    let component: FileFormComponent;
    let fixture: ComponentFixture<FileFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileFormComponent],
            providers: [
                {
                    provide: TranslateService,
                    useValue: {
                        get: () => of([])
                    }
                }
            ]
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
