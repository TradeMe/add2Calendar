'use strict';
import {EventModel} from "../model/event.model";
export const MS_IN_MINUTES = 60 * 1000;

export abstract class BaseCalendarGenerator {
    protected startTime: string;
    protected endTime: string;

    public abstract get href(): string;

    constructor (protected event: EventModel) {
        this.startTime = this.formatTime(event.start);
        this.endTime = this.calculateEndTime(event);
    }

    protected formatTime (date: Date): string {
        return date.toISOString().replace(/-|:|\.\d+/g, '');
    }

    protected calculateEndTime (event): string {
        return event.end ?
            this.formatTime(event.end) :
            this.formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
    }
}