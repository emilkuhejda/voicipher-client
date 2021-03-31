import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormService } from '@home/service/contact-form.service';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContactComponent, TranslateMockPipe],
            imports: [ReactiveFormsModule],
            providers: [
                {
                    provide: DynamicScriptLoaderService,
                    useValue: {
                        loadScript: () => { },
                        removeScript: () => { }
                    }
                },
                {
                    provide: ContactFormService,
                    useValue: () => { }
                },
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
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
