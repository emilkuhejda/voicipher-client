import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageHelper } from '@profile/core/utils/language-helper';
import { MessageService } from 'primeng/api';
import { FileFormData } from './file-form-data';

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

    private translations: { [key: string]: string } = {};

    public fileForm: FormGroup;
    public submitted: boolean = false;
    public audioTypeVisible: boolean = false;

    @Input()
    public loading: boolean = false;

    @Output()
    public loadingChange: EventEmitter<any> = new EventEmitter();

    @Output()
    public save: EventEmitter<FileFormData> = new EventEmitter();

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
        this.audioTypeVisible = LanguageHelper.isPhoneCallModelSupported(this.controls.language.value);

        if (!this.audioTypeVisible) {
            this.controls.audioType.setValue('0');
        }
    }

    public onSubmit() {
        this.submitted = true;

        if (this.fileForm.invalid) {
            return;
        }

        const fileFormData: FileFormData = {
            name: this.controls.name.value,
            language: this.controls.language.value,
            uploadedFile: this.controls.uploadedFile.value,
            audioType: this.controls.audioType.value
        };

        this.save.emit(fileFormData);
        this.submitted = false;
    }

}
