import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '@home/service/storage.service';
import { TranslateService } from '@ngx-translate/core';

import { LocalizationComponent } from './localization.component';

describe('LocalizationComponent', () => {
    let component: LocalizationComponent;
    let fixture: ComponentFixture<LocalizationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LocalizationComponent],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: StorageService,
                    useValue: {
                        setLanguage: () => { }
                    }
                },
                {
                    provide: TranslateService,
                    useValue: {
                        use: () => { }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LocalizationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
