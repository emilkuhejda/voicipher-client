import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateMockPipe } from '../../../tests/translate.mock.pipe';

import { MessageDetailComponent } from './message-detail.component';

describe('MessageDetailComponent', () => {
    let component: MessageDetailComponent;
    let fixture: ComponentFixture<MessageDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessageDetailComponent, TranslateMockPipe],
            imports: [RouterTestingModule],
            providers: [provideMockStore()]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
