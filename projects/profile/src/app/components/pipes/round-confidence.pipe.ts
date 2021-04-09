import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roundConfidence'
})
export class RoundConfidencePipe implements PipeTransform {

    public transform(value: number): number {
        return Math.round(value * 100);
    }

}
