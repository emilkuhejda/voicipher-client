import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-file-create',
    templateUrl: './file-create.component.html',
    styleUrls: ['./file-create.component.scss']
})
export class FileCreateComponent {

    public constructor(private router: Router) { }

    public onUploadCompleted(): void {
        this.router.navigate(['/files']);
    }

}
