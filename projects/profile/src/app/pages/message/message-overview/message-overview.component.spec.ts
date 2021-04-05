import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { MessageOverviewComponent } from './message-overview.component';

describe('MessageOverviewComponent', () => {
    let component: MessageOverviewComponent;
    let fixture: ComponentFixture<MessageOverviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageOverviewComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            providers: [provideMockStore()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
