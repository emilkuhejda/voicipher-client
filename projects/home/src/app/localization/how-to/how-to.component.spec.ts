import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { HowToComponent } from './how-to.component';

describe('HowToComponent', () => {
    let component: HowToComponent;
    let fixture: ComponentFixture<HowToComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HowToComponent, TranslateMockPipe],
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
        fixture = TestBed.createComponent(HowToComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
