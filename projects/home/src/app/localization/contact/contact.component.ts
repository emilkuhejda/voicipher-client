import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    public contactForm: FormGroup | undefined;
    public submitted: boolean = false;
    public loading: boolean = false;
    public successMessage: string = '';
    public errorMessage: string = '';

    public constructor(private formBuilder: FormBuilder) { }

    public ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });
    }

    public get controls() {
        return this.contactForm?.controls;
    }

    public onSubmit() {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';

        if (this.contactForm?.invalid) {
            return;
        }

        this.loading = true;

        const contactFormData = {
            name: this.controls?.name.value,
            email: this.controls?.email.value,
            message: this.controls?.message.value
        };
    }

}
