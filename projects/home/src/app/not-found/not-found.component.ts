import { Component } from '@angular/core';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    public constructor(private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit(): void {
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
    }

}
