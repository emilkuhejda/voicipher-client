import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { StorageService } from './service/storage.service';
import { RouterService } from './service/router.service';
import { TranslateMockPipe } from './tests/translate.mock.pipe';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent,
                TranslateMockPipe
            ],
            providers: [
                {
                    provide: RouterService,
                    useValue: {
                        getLink: () => { }
                    }
                },
                {
                    provide: StorageService,
                    useValue: {
                        getLanguage: () => { }
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

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
