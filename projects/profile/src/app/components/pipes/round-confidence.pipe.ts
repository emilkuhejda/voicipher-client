import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundConfidence'
})
export class RoundConfidencePipe implements PipeTransform {

    public transform(value: number): any {
        return Math.round(value * 100);
    }

}
