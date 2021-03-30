import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';

@Component({
    selector: 'app-how-to',
    templateUrl: './how-to.component.html',
    styleUrls: ['./how-to.component.scss']
})
export class HowToComponent implements OnInit, OnDestroy {

    public constructor(private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit(): void {
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
    }

}
