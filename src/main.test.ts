import {TestDates} from "./generators/test-dates";
import {Add2CalendarService} from "./main";
import {CalendarTypeEnum} from "./model/calendar-type.enum";
import {EventModel} from "./model/event.model";

import {BaseCalendarGenerator} from "./generators/base-calendar.generator";
import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";
import {OutlookCalendarGenerator} from "./generators/outlook-calendar.generator";
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

            let originalGetGeneratorFor: (type: CalendarTypeEnum) => typeof BaseCalendarGenerator;
            let currentGeneratorType: typeof BaseCalendarGenerator;

            beforeAll(() => {
                originalGetGeneratorFor = (Add2CalendarService as any).getGeneratorFor;
                (Add2CalendarService as any).getGeneratorFor = (type: CalendarTypeEnum) => {
                    currentGeneratorType = originalGetGeneratorFor(type);
                    spyOnProperty(currentGeneratorType.prototype as any, "uid", "get")
                        .and
                        .returnValue("31242880-36a6-4ec9-89af-b856307751e5");
                    return currentGeneratorType;
                };
            });

            afterAll(() => {
                (Add2CalendarService as any).getGeneratorFor = originalGetGeneratorFor;
            });

            it("should get the href value for google", () => {
                // Arrange
                const expectedUrl = new GoogleCalendarGenerator(model).href;

                // Act
                const serviceUrl = Add2CalendarService.getHrefFor(CalendarTypeEnum.google, model);

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
                let expectedFileBlob: string;

                // Act
                const serviceFileBlob =
                    (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.iCalendar, model);

                expectedFileBlob = new (currentGeneratorType as any)(model).href;

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });

            it("should get the href value for outlook", () => {
                // Arrange
                let expectedFileBlob: string;

                // Act
                const serviceFileBlob = (Add2CalendarService as any).getHrefFor(CalendarTypeEnum.outlook, model);

                expectedFileBlob = new (currentGeneratorType as any)(model).href;

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });
        });

        describe("getFor", () => {
            it("should return GoogleCalendarGenerator for google", () => {
                // Act
                const generator = (Add2CalendarService as any).getGeneratorFor(CalendarTypeEnum.google);

                // Assert
                expect(generator).toBe(GoogleCalendarGenerator);
            });

            it("should return YahooCalendarGenerator for yahoo", () => {
                // Act
                const generator = (Add2CalendarService as any).getGeneratorFor(CalendarTypeEnum.yahoo);

                // Assert
                expect(generator).toBe(YahooCalendarGenerator);
            });

            it("should return IcsCalendarGenerator for iCalendar", () => {
                // Act
                const generator = (Add2CalendarService as any).getGeneratorFor(CalendarTypeEnum.iCalendar);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });

            it("should return IcsCalendarGenerator for outlook", () => {
                // Act
                const generator = (Add2CalendarService as any).getGeneratorFor(CalendarTypeEnum.outlook);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });

            it("should return OutlookGenerator for outlook online", () => {
                // Act
                const generator = (Add2CalendarService as any).getGeneratorFor(CalendarTypeEnum.outlookLive);

                // Assert
                expect(generator).toBe(OutlookCalendarGenerator);
            });
        });
    });
});
