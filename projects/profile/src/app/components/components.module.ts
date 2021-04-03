import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileFormComponent } from './file-form/file-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
    FileFormComponent
];

@NgModule({
    declarations: components,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: components
})
export class ComponentsModule { }
