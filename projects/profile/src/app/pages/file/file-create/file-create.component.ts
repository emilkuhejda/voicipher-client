import { Component } from '@angular/core';
import { FileFormData } from '@profile/components/file-form/file-form-data';

@Component({
    selector: 'app-file-create',
    templateUrl: './file-create.component.html',
    styleUrls: ['./file-create.component.scss']
})
export class FileCreateComponent {

    public progress: number = 0;
    public loading: boolean = false;

    public constructor() { }

    public save(fileFormData: FileFormData) { }

}
