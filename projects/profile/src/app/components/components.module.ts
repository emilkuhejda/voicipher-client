import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileFormComponent } from './file-form/file-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';

const components = [
    FileFormComponent
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProgressBarModule,
        TranslateModule.forChild({
            extend: true,
            isolate: false
        })
    ],
    exports: components
})
export class ComponentsModule { }
