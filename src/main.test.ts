import {TestDates} from "./generators/test-dates";
import {Add2CalendarService} from "./main";
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";

import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";

describe("add2Calendar", () => {
    describe("Add2CalendarService", () => {
        let model: EventModel;

        beforeEach(() => {
            model = {
                address: "address and space",
                description: "description and space",
                end: TestDates._1970_01_02,
                start: TestDates._1970_01_01,
                title: "title and space",
            } as EventModel;
        });

        describe("getHrefFor", () => {
            it("should get the href value for google", () => {
                // Arrange
                const expectedUrl = new GoogleCalendarGenerator(model).href;

                // Act
                const serviceUrl = (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.google, model);

                // Assert
                expect(serviceUrl).toBe(expectedUrl);
            });

            it("should get the href value for yahoo", () => {
                // Arrange
                const expectedUrl = new YahooCalendarGenerator(model).href;

                // Act
                const serviceUrl = (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.yahoo, model);

                // Assert
                expect(serviceUrl).toBe(expectedUrl);
            });

            it("should get the href value for iCalendar", () => {
                // Arrange
                const expectedFileBlob = new IcsCalendarGenerator(model).href;

                // Act
                const serviceFileBlob = (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.iCalendar, model);

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });

            it("should get the href value for outlook", () => {
                // Arrange
                const expectedFileBlob = new IcsCalendarGenerator(model).href;

                // Act
                const serviceFileBlob = (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.outlook, model);

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });
        });

        describe("getFor", () => {
            it("should return GoogleCalendarGenerator for google", () => {
                // Act
                const generator = (Add2CalendarService as any).getFor(CalendarTypeEnum.google);

                // Assert
                expect(generator).toBe(GoogleCalendarGenerator);
            });

            it("should return YahooCalendarGenerator for yahoo", () => {
                // Act
                const generator = (Add2CalendarService as any).getFor(CalendarTypeEnum.yahoo);

                // Assert
                expect(generator).toBe(YahooCalendarGenerator);
            });

            it("should return IcsCalendarGenerator for iCalendar", () => {
                // Act
                const generator = (Add2CalendarService as any).getFor(CalendarTypeEnum.iCalendar);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });

            it("should return IcsCalendarGenerator for outlook", () => {
                // Act
                const generator = (Add2CalendarService as any).getFor(CalendarTypeEnum.outlook);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });
        });
    });
});
