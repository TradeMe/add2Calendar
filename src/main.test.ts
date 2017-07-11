'use strict';

import {Add2CalendarService} from "./main";
import {TestConstants} from "./generators/test-constants";
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
                start: TestConstants.date_1970_01_01,
                end: TestConstants.date_1970_01_02
            };
        });

        describe('getHrefFor', () => {
            it('should get the value from the href property', () => {
                // Arrange
                let service = { ... Add2CalendarService };

                let spyFor_getFor =
                    jasmine.createSpy('getFor').and.returnValue(GoogleCalendarGenerator);

                (<any>service).getFor = spyFor_getFor;

                let expectedUrl = new GoogleCalendarGenerator(model).href;

                // Act
                let serviceUrl = (<any>service).getHrefFor(CalendarTypeEnum.google, model);

                // Assert
                expect(serviceUrl).toBe(expectedUrl);
                expect(spyFor_getFor).toHaveBeenCalledWith(CalendarTypeEnum.google);
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
