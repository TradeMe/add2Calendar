import {EventModel} from "../model/event.model";

export const MS_IN_MINUTES = 60 * 1000;
export const DATE_POCTUATION_REGEX = /-|:|\.\d+/g;

export abstract class BaseCalendarGenerator {
    protected startTime: string;
    protected endTime: string;

    public abstract get href(): string;

    constructor(protected event: EventModel) {
        this.startTime = this.formatTime(event.start);
        this.endTime = this.calculateEndTime(event);
    }

    protected formatTime(date: Date): string {
        return date.toISOString().replace(DATE_POCTUATION_REGEX, "");
    }

    protected calculateEndTime(event): string {
        if (event.end) {
            return this.formatTime(event.end);
        }

        if (!event.duration) {
            throw new Error("You have to provide either the duration or end");
        }

        return this.formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
    }
}
