import {BaseCalendarGenerator} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";

export const GOOGLE_URL = 'https://www.google.com/calendar/render?action=TEMPLATE';
export const DATE_POCTUATION_REGEX = /-|:|\.\d+/g;

export class GoogleCalendarGenerator extends BaseCalendarGenerator{

    constructor (protected event: EventModel) {
        super(event);
    }

    protected formatTime (date: Date): string {
        return date.toISOString().replace(DATE_POCTUATION_REGEX, '');
    }

    public get href (): string {
        return encodeURI([
            GOOGLE_URL,
            `&text=${(this.event.title || '')}`,
            `&dates=${(this.startTime || '')}/${(this.endTime || '')}`,
            `&details=${(this.event.description || '')}`,
            `&location=${(this.event.address || '')}`,
            `&sprop=${(this.event.url || '')}`
        ].join(''));
    }
}
