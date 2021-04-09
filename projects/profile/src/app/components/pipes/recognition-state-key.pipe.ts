import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recognitionStateKey'
})
export class RecognitionStateKeyPipe implements PipeTransform {

    public transform(value: string): any {
        switch (value) {
            case 'None':
                return 'RecognitionState.Ready';
            case 'Converting':
            case 'Prepared':
            case 'InProgress':
                return 'RecognitionState.InProgress';
            case 'Completed':
                return 'RecognitionState.Completed';
        }
    }

}
