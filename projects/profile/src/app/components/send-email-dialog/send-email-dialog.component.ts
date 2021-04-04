import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        private formBuilder: FormBuilder,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef) {
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
    }

    public close() {
        this.ref.close();
    }

}
