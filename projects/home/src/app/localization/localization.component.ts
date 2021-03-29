import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@home/environment';
import { StorageService } from '@home/service/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    private language: string = environment.defaultLanguage;

    public constructor(private translateService: TranslateService, private storageService: StorageService, private router: Router, private route: ActivatedRoute) {
        this.language = this.route.snapshot.params.lang;
        if (!environment.languages.find(x => x === this.language)) {
            this.router.navigate(['/404']);
            return;
        }

        this.translateService.use(this.language).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.storageService.setLanguage(this.language);
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public onActivate() {
        window.scrollTo({ top: 0 });
    }

}
