import {EventModel} from "../model/event.model";
import {BaseCalendarGenerator} from "./base-calendar.generator";

export class IcsCalendarGenerator extends BaseCalendarGenerator {

    constructor(protected event: EventModel) {
        super(event);
    }

    public get href(): string {
        return encodeURI(
            "data:text/calendar;charset=utf8," + [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "BEGIN:VEVENT",
                `URL:${this.event.url}`,
                `DTSTART:${(this.startTime || "")}`,
                `DTEND:${(this.endTime || "")}`,
                `SUMMARY:${(this.event.title || "")}`,
                `DESCRIPTION:${(this.event.description || "")}`,
                `LOCATION:${(this.event.address || "")}`,
                "END:VEVENT",
                "END:VCALENDAR"].join("\n"));
    }
}
