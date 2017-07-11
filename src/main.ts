'use strict';
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";
import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {BaseCalendarGenerator} from "./generators/base-calendar.generator";

export class Add2CalendarService {

    private static _factory: Function[];

    private static _constructor: void = (() => {
        Add2CalendarService._factory = [
            GoogleCalendarGenerator,
            YahooCalendarGenerator,
            IcsCalendarGenerator,
            IcsCalendarGenerator,
        ];
    })();

    private static getFor (type: CalendarTypeEnum): Function {
        return Add2CalendarService._factory[type];
    }

    public static getHrefFor (type: CalendarTypeEnum, event: EventModel): string {
        let genType = <typeof Object> Add2CalendarService._factory[type];

        return new (<any> genType(event)).href;
    }
}