import {Add2CalendarService} from "./main";
import {TestDates} from "./generators/test-dates";
import {EventModel} from "./model/event.model";
import {CalendarTypeEnum} from "./model/calendar-type.enum";

import {GoogleCalendarGenerator} from "./generators/google-calendar.generator";
import {YahooCalendarGenerator} from "./generators/yahoo-calendar.generator";
import {IcsCalendarGenerator} from "./generators/ics-calendar.generator";

describe('add2Calendar', () => {
    describe('Add2CalendarService', () => {
        let model: EventModel;

        beforeEach(() => {
            model = <EventModel> {
                title: 'title and space',
                description: 'description and space',
                address: 'address and space',
                start: TestDates._1970_01_01,
                end: TestDates._1970_01_02
            };
        });

        describe('getHrefFor', () => {
            it('should get the href value for google', () => {
                // Arrange
                let expectedUrl = new GoogleCalendarGenerator(model).href;

                // Act
                let serviceUrl = (<any>Add2CalendarService).getHrefFor(CalendarTypeEnum.google, model);

                // Assert
                expect(serviceUrl).toBe(expectedUrl);
            });

            it('should get the href value for yahoo', () => {
                // Arrange
                let expectedUrl = new YahooCalendarGenerator(model).href;

                // Act
                let serviceUrl = (<any>Add2CalendarService).getHrefFor(CalendarTypeEnum.yahoo, model);

                // Assert
                expect(serviceUrl).toBe(expectedUrl);
            });

            it('should get the href value for iCalendar', () => {
                // Arrange
                let expectedFileBlob = new IcsCalendarGenerator(model).href;

                // Act
                let serviceFileBlob = (<any>Add2CalendarService).getHrefFor(CalendarTypeEnum.iCalendar, model);

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });

            it('should get the href value for outlook', () => {
                // Arrange
                let expectedFileBlob = new IcsCalendarGenerator(model).href;

                // Act
                let serviceFileBlob = (<any>Add2CalendarService).getHrefFor(CalendarTypeEnum.outlook, model);

                // Assert
                expect(serviceFileBlob).toBe(expectedFileBlob);
            });
        });

        describe('getFor', () => {
            it('should return GoogleCalendarGenerator for google', () => {
                // Act
                let generator = (<any>Add2CalendarService).getFor(CalendarTypeEnum.google);

                // Assert
                expect(generator).toBe(GoogleCalendarGenerator);
            });

            it('should return YahooCalendarGenerator for yahoo', () => {
                // Act
                let generator = (<any>Add2CalendarService).getFor(CalendarTypeEnum.yahoo);

                // Assert
                expect(generator).toBe(YahooCalendarGenerator);
            });

            it('should return IcsCalendarGenerator for iCalendar', () => {
                // Act
                let generator = (<any>Add2CalendarService).getFor(CalendarTypeEnum.iCalendar);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });

            it('should return IcsCalendarGenerator for outlook', () => {
                // Act
                let generator = (<any>Add2CalendarService).getFor(CalendarTypeEnum.outlook);

                // Assert
                expect(generator).toBe(IcsCalendarGenerator);
            });
        });
    });
});
