'use strict';
import {BaseCalendarGenerator, MS_IN_MINUTES} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";

export class IcsCalendarGenerator extends BaseCalendarGenerator {

    constructor(protected event: EventModel) {
        super(event);
    }

    public get href (): string {
        return encodeURI(
            'data:text/calendar;charset=utf8,' + [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                `URL:${this.event.documentURL}`,
                `DTSTART:${(this.startTime.toString() || '')}`,
                `DTEND:${(this.endTime.toString() || '')}`,
                `SUMMARY:${(this.event.title || '')}`,
                `DESCRIPTION:${(this.event.description || '')}`,
                `LOCATION:${(this.event.address || '')}`,
                'END:VEVENT',
                'END:VCALENDAR'].join('\n'));
    }
}