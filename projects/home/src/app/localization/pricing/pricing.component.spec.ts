import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { PricingComponent } from './pricing.component';

describe('PricingComponent', () => {
    let component: PricingComponent;
    let fixture: ComponentFixture<PricingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PricingComponent, TranslateMockPipe],
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
        fixture = TestBed.createComponent(PricingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
