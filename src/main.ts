import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";

export class Add2CalendarService {

    public static getHrefFor(type: CalendarTypeEnum, event: EventModel): string {
        const genType = Add2CalendarService.factory[type] as typeof Object;

        return new (genType as any)(event).href;
    }

    // tslint:disable-next-line
    private static factory: Function[];

    private static stConstructor: void = (() => {
        Add2CalendarService.factory = [
            GoogleCalendarGenerator,
            YahooCalendarGenerator,
            IcsCalendarGenerator,
            IcsCalendarGenerator,
        ];
    })();

    // tslint:disable-next-line
    private static getFor(type: CalendarTypeEnum): Function {
        return Add2CalendarService.factory[type];
    }
}
