import { Component, Input } from '@angular/core';
import { MessageModel } from './message.model';

@Component({
    selector: 'voc-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent {

    @Input()
    public activeMessages: number | null = null;

    @Input()
    public header: string = '';

    @Input()
    public navigationButtonText: string = '';

    @Input()
    public navigationUrl: string[] = [];

    @Input()
    public messages: MessageModel[] | null = null;

    public constructor() { }

}
