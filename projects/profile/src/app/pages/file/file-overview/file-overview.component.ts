import { Component, OnInit } from '@angular/core';
import { FileService } from '@profile/service/file.service';

@Component({
    selector: 'app-file-overview',
    templateUrl: './file-overview.component.html',
    styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent implements OnInit {

    public constructor(private fileService: FileService) { }

    public ngOnInit(): void {
        this.fileService.getAll().subscribe(files => console.log(files));
    }

}
