import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

    public fileForm: FormGroup;
    public progress: number = 0;
    public selectedFileName: string = 'Choose file';
    public selectedLanguage: string = '';
    public submitted: boolean = false;
    public loading: boolean = false;
    public isModelSupported: boolean = false;

    public constructor(private formBuilder: FormBuilder) {
        this.fileForm = formBuilder.group({
            name: ['', Validators.required],
            language: ['', Validators.required],
            audioType: ['0', Validators.required]
        });
    }

    public ngOnInit(): void { }

    public get controls(): { [key: string]: AbstractControl } {
        return this.fileForm.controls;
    }

    onChange(files: any) { }

    onSelectChange() { }

    public onSubmit(files: any) { }

}
