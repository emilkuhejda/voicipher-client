import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileFormComponent } from './file-form/file-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';
import { RoundConfidencePipe } from './pipes/round-confidence.pipe';
import { TranscribeItemComponent } from './transcribe-item/transcribe-item.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TranscribeDialogComponent } from './transcribe-dialog/transcribe-dialog.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages'
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

const components = [
    FileFormComponent,
    TranscribeItemComponent,
    TranscribeDialogComponent,
    SendEmailDialogComponent,
    RoundConfidencePipe
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProgressBarModule,
        InputTextareaModule,
        ButtonModule,
        InputSwitchModule,
        MessagesModule,
        NgbTimepickerModule,
        TranslateModule.forChild({
            extend: true,
            isolate: false
        })
    ],
    exports: components
})
export class ComponentsModule { }
