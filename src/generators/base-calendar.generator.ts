import {EventModel} from "../model/event.model";

export const MS_IN_MINUTES = 60 * 1000;

export abstract class BaseCalendarGenerator {
    protected startTime: string;
    protected endTime: string;

    public abstract get href(): string;

    constructor (protected event: EventModel) {
        debugger;
        this.startTime = this.formatTime(event.start);
        this.endTime = this.calculateEndTime(event);
    }

    private pad(number): string {
        return number < 10 ?
            '0' + number :
            number;
    }

    private formatTimezone(date) {
        let tz = date.getTimezoneOffset()/60;
        return (tz < 0? '+' : '-') + Math.abs(tz) + '00';
    }

    private convertToGMT(date: Date): Date {
        return new Date(date.getTime() + date.getTimezoneOffset() * MS_IN_MINUTES);
    }

    protected formatTime (date: Date): string {

        let gmtDate = this.convertToGMT(date);

        return date.getUTCFullYear() +
            this.pad(gmtDate.getUTCMonth() + 1) +
            this.pad(gmtDate.getUTCDate()) +
            'T' + this.pad(gmtDate.getUTCHours()) +
            this.pad(gmtDate.getUTCMinutes()) +
            this.pad(gmtDate.getUTCSeconds()) +
            this.formatTimezone(gmtDate)
    };

    protected calculateEndTime (event): string {
        return event.end ?
            this.formatTime(event.end) :
            this.formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
    }
}