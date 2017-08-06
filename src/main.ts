import {BaseCalendarGenerator} from "./generators/base-calendar.generator";
import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {OutlookCalendarGenerator} from "./generators/outlook-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";

export class Add2CalendarService {
    public static getHrefFor(type: CalendarTypeEnum, event: EventModel): string {
        const generatorType =
            Add2CalendarService.getGeneratorFor(type) as any;

        return (new generatorType(event) as BaseCalendarGenerator).href;
    }

    // tslint:disable-next-line
    private static factory: typeof BaseCalendarGenerator[];

    private static stConstructor: void = (() => {
        Add2CalendarService.factory = [
            GoogleCalendarGenerator,
            YahooCalendarGenerator,
            IcsCalendarGenerator,
            IcsCalendarGenerator,
            OutlookCalendarGenerator,
        ];
    })();

    // tslint:disable-next-line
    private static getGeneratorFor(type: CalendarTypeEnum): typeof BaseCalendarGenerator {
        return Add2CalendarService.factory[type];
    }
}
