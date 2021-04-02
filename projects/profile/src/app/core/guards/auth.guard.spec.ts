import { TestBed } from '@angular/core/testing';
import { MsalService } from '@profile/service/msal.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: MsalService,
                    useValue: {
                        isLoggedIn: () => true
                    }
                }
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
