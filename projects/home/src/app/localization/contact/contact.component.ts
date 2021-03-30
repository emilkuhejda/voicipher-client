import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '@home/service/contact-form.service';
import { DynamicScriptLoaderService } from '@home/service/dynamic-script-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ContactFormModel } from '../../domain/contact-form.model';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    private translations: any = {};

    public contactForm: FormGroup | undefined;
    public submitted: boolean = false;
    public loading: boolean = false;
    public successMessage: string = '';
    public errorMessage: string = '';

    public constructor(
        private formBuilder: FormBuilder,
        private contactFormService: ContactFormService,
        private translateService: TranslateService,
        private dynamicScriptLoaderService: DynamicScriptLoaderService) { }

    public ngOnInit() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required]
        });

        this.translateService
            .get(['ContactPage.SuccessMessage', 'ContactPage.FailedMessage'])
            .subscribe(translations => this.translations = translations);
        this.dynamicScriptLoaderService.loadScript('script');
    }

    public ngOnDestroy(): void {
        this.dynamicScriptLoaderService.removeScript('script');
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

        const contactFormData: ContactFormModel = {
            name: this.controls?.name.value,
            email: this.controls?.email.value,
            message: this.controls?.message.value
        };

        this.contactFormService
            .create(contactFormData)
            .subscribe(
                () => this.successMessage = this.translations['ContactPage.SuccessMessage'],
                () => this.errorMessage = this.translations['ContactPage.FailedMessage']
            )
            .add(() => this.loading = false);
    }

}
