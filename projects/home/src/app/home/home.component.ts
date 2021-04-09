import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@home/environment';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public constructor(private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit(): void {
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
    }

    public getProfileUrl(): string {
        return environment.profileUrl;
    }

}
