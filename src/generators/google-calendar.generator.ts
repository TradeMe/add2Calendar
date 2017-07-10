'use strict';
import {BaseCalendarGenerator} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";

const GOOGLE_URL = 'https://www.google.com/calendar/render?action=TEMPLATE';

export class GoogleCalendarGenerator extends BaseCalendarGenerator{

    constructor (protected event: EventModel) {
        super(event);
    }

    public get href (): string {
        return encodeURI([
            GOOGLE_URL,
            `&text=${(this.event.title || '')}`,
            `&dates=${(this.startTime || '')}`,
            `/${(this.endTime || '')}`,
            `&details=${(this.event.description || '')}`,
            `&location=${(this.event.address || '')}`,
            '&sprop=&sprop=name:'
        ].join(''));
    }
}
