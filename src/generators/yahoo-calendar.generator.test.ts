'use strict';

import {} from 'jasmine';

import {YAHOO_URL, YahooCalendarGenerator} from "./yahoo-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestConstants} from "./test-constants";
import {MS_IN_MINUTES} from "./base-calendar.generator";

describe('add2Calendar', () => {
    describe('yahoo-calendar.generator', () => {
        let expected: any;
        let model: EventModel;
        let generator: any;

        beforeEach(() => {
            expected = {
                startTime: TestConstants.isoDate_1970_01_01,
                endTime: TestConstants.isoDate_1970_01_02,
                title: 'title and space',
                description: 'description and space',
                address: 'address and space'
            };

            model = <EventModel> {
                title: expected.title,
                description: expected.description,
                address: expected.address,
                start: TestConstants.date_1970_01_01,
                end: TestConstants.date_1970_01_02
            };

            generator = new YahooCalendarGenerator(model);
        });

        describe('href', () => {
            it('should be a valid url', () => {
                // Arrange
                let expectedUrl = encodeURI(
                    `${YAHOO_URL}&title=${expected.title}&st=${generator.getSt()}&dur=${generator.getYahooEventDuration()}&desc=${expected.description}&in_loc=${expected.address}`);

                // Act
                let url = generator.href;

                // Assert
                expect(url).toBe(expectedUrl);
            });
        });

        describe('getSt', () => {
            it('should remove timezone from event time', () => {
                let date = new Date((<any> TestConstants.date_1970_01_01) - ( TestConstants.date_1970_01_01.getTimezoneOffset() * MS_IN_MINUTES));
                let expectedDate = generator.formatTime(date )

                let st = generator.getSt();

                expect(st).toBe(expectedDate)
            });
        });

        describe('getYahooEventDuration', () => {
            it('should be on the format yahoo expects', () => {
                let expectedYahooEventDuration = '2400';

                let  duration = generator.getYahooEventDuration();

                expect(duration).toBe(expectedYahooEventDuration);
            });
        });
    });
});
