import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
    let component: TermsComponent;
    let fixture: ComponentFixture<TermsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TermsComponent, TranslateMockPipe],
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
        fixture = TestBed.createComponent(TermsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
