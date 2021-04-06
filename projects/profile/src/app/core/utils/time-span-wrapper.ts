import { formatDate } from '@angular/common';

export class TimeSpanWrapper {
    public ticks: number = 0;

    public constructor(ticks: number = 0) {
        this.ticks = ticks;
    }

    public getTime(): string {
        return formatDate(this.getDate(), 'HH:mm:ss', 'en-US');
    }

    public getDate(): Date {
        const ticksToMicrotime = this.ticks / 10000;
        const epochMicrotimeDiff = Math.abs(new Date(0, 0, 1).setFullYear(1));

        return new Date(ticksToMicrotime - epochMicrotimeDiff);
    }

    public getTotalSeconds(isRounded: boolean = false): number {
        const seconds = this.ticks / (10000 * 1000);
        return isRounded ? Math.floor(seconds) : seconds;
    }
}
