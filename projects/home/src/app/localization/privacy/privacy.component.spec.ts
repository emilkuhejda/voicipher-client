import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
    let component: PrivacyComponent;
    let fixture: ComponentFixture<PrivacyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrivacyComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: DynamicScriptLoaderService,
                    useValue: {
                        loadScript: () => { },
                        removeScript: () => { }
                    }
                }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivacyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
