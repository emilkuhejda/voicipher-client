import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FileFormData } from '@profile/core/models/file-form-data';
import { LanguageHelper } from '@profile/core/utils/language-helper';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { getCurrentFileIdentifier, getCurrentUploadedFileProgress } from '@profile/state/selectors/audio-file.selectors';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FileFormModel } from './file-form.model';

@Component({
    selector: 'app-file-form',
    templateUrl: './file-form.component.html',
    styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit, OnDestroy, OnChanges {
    private destroy$: Subject<void> = new Subject<void>();

    private translations: { [key: string]: string } = {};
    private identifier: string = new Date().toString();
    private id: string = '';
    private transcriptionStartTime: string = '0';
    private transcriptionEndTime: string = '0';

    public fileForm: FormGroup;
    public loading: boolean = false;
    public submitted: boolean = false;
    public audioTypeVisible: boolean = false;

    public progres$: Observable<number> | undefined;

    @Input()
    public saveButtonText: string = '';

    @Input()
    public dataSource: FileFormModel | undefined;

    @Output()
    public uploadCompleted: EventEmitter<any> = new EventEmitter();

    public constructor(
        formBuilder: FormBuilder,
        translateService: TranslateService,
        private store: Store<AppState>,
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

    public ngOnInit(): void {
        this.store.dispatch(AudioFilePageAction.setCurrentFileIdentifier({ identifier: this.identifier }));
        this.store
            .select(getCurrentFileIdentifier)
            .pipe(takeUntil(this.destroy$))
            .subscribe(identifier => {
                if (identifier === '') {
                    this.loading = false;
                }
            });

        this.progres$ = this.store.select(getCurrentUploadedFileProgress).pipe(
            tap(progress => {
                if (progress >= 100) {
                    this.uploadCompleted.emit();
                }
            })
        );

        if (this.dataSource) {
            this.initializeData(this.dataSource);
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.dataSource && changes.dataSource.currentValue) {
            this.initializeData(changes.dataSource.currentValue);
        }
    }

    public get controls(): { [key: string]: AbstractControl } {
        return this.fileForm.controls;
    }

    public onChange(files: FileList | null): void {
        if (!files || files.length === 0) {
            this.controls.uploadedFile.setValue('');
            this.messageService.add({ severity: 'error', detail: this.translations['FileForm.MultipleUploadError'] });
            return;
        }

        this.controls.uploadedFile.setValue(files[0]);
    }

    public onSelectChange(): void {
        this.audioTypeVisible = LanguageHelper.isPhoneCallModelSupported(this.controls.language.value);

        if (!this.audioTypeVisible) {
            this.controls.audioType.setValue('0');
        }
    }

    public onSubmit(): void {
        this.submitted = true;

        if (this.fileForm.invalid) {
            return;
        }

        const audioType = this.controls.audioType.value;
        const fileFormData: FileFormData = {
            name: this.controls.name.value,
            language: this.controls.language.value,
            uploadedFile: this.controls.uploadedFile.value,
            audioType: audioType,
            transcriptionStartTime: audioType === '1' ? this.transcriptionStartTime : '0',
            transcriptionEndTime: audioType === '1' ? this.transcriptionEndTime : '0'
        };

        this.loading = true;

        if (this.id === '') {
            this.store.dispatch(AudioFilePageAction.createAudioFilesRequest({ identifier: this.identifier, fileFormData }));
        } else {
            this.store.dispatch(AudioFilePageAction.updateAudioFilesRequest({
                identifier: this.identifier,
                audioFileId: this.id,
                fileFormData
            }));
        }
    }

    private initializeData(fileFormModel: FileFormModel): void {
        this.id = fileFormModel.id;
        this.transcriptionStartTime = fileFormModel.transcriptionStartTime;
        this.transcriptionEndTime = fileFormModel.transcriptionEndTime;

        this.controls.name.setValue(fileFormModel.name);
        this.controls.language.setValue(fileFormModel.language);
        this.controls.audioType.setValue(fileFormModel.audioType);

        this.controls.uploadedFile.clearValidators();
        this.controls.uploadedFile.setErrors(null);

        this.onSelectChange();
    }

}
