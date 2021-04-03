import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

    private translations: { [key: string]: string } = {};

    public fileForm: FormGroup;
    public progress: number = 0;
    public selectedLanguage: string = '';
    public submitted: boolean = false;
    public loading: boolean = false;
    public audioTypeVisible: boolean = false;

    public constructor(
        formBuilder: FormBuilder,
        translateService: TranslateService,
        private messageService: MessageService) {
        this.fileForm = formBuilder.group({
            name: ['', Validators.required],
            language: ['', Validators.required],
            uploadedFile: [null, Validators.required],
            audioType: ['0', Validators.required]
        });

        translateService
            .get(['FileForm.MultipleUploadError'])
            .subscribe(translations => this.translations = translations);
    }

    public ngOnInit(): void { }

    public get controls(): { [key: string]: AbstractControl } {
        return this.fileForm.controls;
    }

    public onChange(files: FileList | null) {
        if (!files || files.length === 0) {
            this.controls.uploadedFile.setValue('');
            this.messageService.add({ severity: 'error', detail: this.translations['FileForm.MultipleUploadError'] });
            return;
        }

        this.controls.uploadedFile.setValue(files[0]);
    }

    public onSelectChange() {
        this.audioTypeVisible = true;
    }

    public onSubmit() {
        this.submitted = true;
        console.log(this.controls.uploadedFile.value);
    }

}
