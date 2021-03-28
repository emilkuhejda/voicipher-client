import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@home/environment';
import { StorageService } from '@home/service/storage.service';

@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {

    constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        const lang = this.route.snapshot.params.lang;
        if (!environment.languages.find(x => x === lang)) {
            this.router.navigate(['/404']);
            return;
        }

        this.storageService.setLanguage(lang);
    }

}
