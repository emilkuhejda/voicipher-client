import { TestBed } from '@angular/core/testing';
import { MsalService } from '@profile/service/msal.service';

import { MsalGuard } from './msal.guard';

describe('MsalGuard', () => {
    let guard: MsalGuard;

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
        guard = TestBed.inject(MsalGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
