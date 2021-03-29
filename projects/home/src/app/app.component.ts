import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { PagePath } from '@home/service/types';
import { takeUntil } from 'rxjs/operators';
import { StorageService } from '@home/service/storage.service';
import { RouterService } from '@home/service/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    public currentLanguage: string | undefined;

    public constructor(
        private routerService: RouterService,
        private storageService: StorageService,
        private translateService: TranslateService) { }

    public ngOnInit(): void {
        this.currentLanguage = this.storageService.getLanguage();
        this.translateService.use(this.currentLanguage);
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public getLink(path: PagePath): string[] {
        return this.routerService.getLink(path);
    }

    public changeLanguage(language: string): void {
        this.translateService.use(language).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.storageService.setLanguage(language);
            this.currentLanguage = language;
        });
    }

    public onActivate() {
        window.scrollTo({ top: 0 });
    }

}
