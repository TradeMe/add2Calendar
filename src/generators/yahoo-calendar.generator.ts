import {BaseCalendarGenerator, MS_IN_MINUTES} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";

export const YAHOO_URL = 'http://calendar.yahoo.com/?v=60&view=d&type=20';

export class YahooCalendarGenerator extends BaseCalendarGenerator{

    constructor (protected event: EventModel) {
        super(event);
    }

    private getYahooEventDuration () {
        let eventDuration = this.event.end ?
            ((this.event.end.getTime() - this.event.start.getTime())/ MS_IN_MINUTES) :
            this.event.duration;

        // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
        let yahooHourDuration = eventDuration < 600 ?
            `0${Math.floor((eventDuration / 60))}` :
            `${Math.floor((eventDuration / 60))}`;

        let yahooMinuteDuration = eventDuration % 60 < 10 ?
            `0${eventDuration % 60}` :
            `${eventDuration % 60}`;

        return yahooHourDuration + yahooMinuteDuration;
    }

    public get href (): string {
        return encodeURI([
            YAHOO_URL,
            `&title=${(this.event.title || '')}`,
            `&st=${this.startTime}`,
            `&dur=${(this.getYahooEventDuration() || '')}`,
            `&desc=${(this.event.description || '')}`,
            `&in_loc=${(this.event.address || '')}`,
            `&url=${(this.event.url || '')}`
        ].join(''));
    }
}
