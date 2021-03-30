import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit, OnDestroy {

    public constructor(private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit(): void {
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
    }

}
