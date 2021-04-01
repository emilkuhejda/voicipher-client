import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'voc-logout-dialog',
    templateUrl: './logout-dialog.component.html',
    styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent {

    @Input()
    public title: string = '';

    @Input()
    public body: string = '';

    @Input()
    public cancelButtonText: string = '';

    @Input()
    public okButtonText: string = '';

    @Output()
    public okCommand: EventEmitter<any> = new EventEmitter();

    public constructor() { }

    public handleClick() {
        this.okCommand.emit();
    }

}
