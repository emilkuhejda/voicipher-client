import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AudioFilePageAction } from '@profile/state/actions';
import { AppState } from '@profile/state/app.state';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-send-email-dialog',
    templateUrl: './send-email-dialog.component.html',
    styleUrls: ['./send-email-dialog.component.scss']
})
export class SendEmailDialogComponent {
    public emailForm: FormGroup;
    public submitted: boolean = false;
    public loading: boolean = false;

    public constructor(
        private store: Store<AppState>,
        private formBuilder: FormBuilder,
        private config: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef) {
        this.emailForm = this.formBuilder.group({
            emailAddress: ['', [Validators.required, Validators.email]]
        });
    }

    public get controls() {
        return this.emailForm.controls;
    }

    public onSubmit() {
        this.submitted = true;
        if (this.emailForm.invalid) {
            return;
        }

        this.loading = true;
        this.store.dispatch(AudioFilePageAction.sendEmailRequest({
            audioFileId: this.config.data.audioFile.id,
            recipient: this.controls.emailAddress.value
        }));
        this.dialogRef.close();
    }

    public close() {
        this.dialogRef.close();
    }

}
