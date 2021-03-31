import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateMockPipe } from '../tests/translate.mock.pipe';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotFoundComponent, TranslateMockPipe],
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
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
