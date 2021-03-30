import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit, OnDestroy {

    public constructor(private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit(): void {
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
    }

}
