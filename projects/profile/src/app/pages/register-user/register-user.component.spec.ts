import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MsalService } from '@profile/service/msal.service';
import { StorageService } from '@profile/service/storage.service';
import { of } from 'rxjs';
import { TranslateMockPipe } from '../../tests/translate.mock.pipe';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
    let component: RegisterUserComponent;
    let fixture: ComponentFixture<RegisterUserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterUserComponent, TranslateMockPipe],
            providers: [
                provideMockStore(),
                {
                    provide: MsalService,
                    useValue: {
                        getUserId: () => '',
                        getEmail: () => '',
                        getGivenName: () => '',
                        getFamilyName: () => ''
                    }
                },
                {
                    provide: StorageService,
                    useValue: {}
                }
            ],
            imports: [RouterTestingModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
