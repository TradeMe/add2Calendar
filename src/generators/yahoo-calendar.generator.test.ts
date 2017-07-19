import {} from 'jasmine';

import {YAHOO_URL, YahooCalendarGenerator} from "./yahoo-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestDates} from "./test-dates";
import {MS_IN_MINUTES} from "./base-calendar.generator";

describe('add2Calendar', () => {
    describe('yahoo-calendar.generator', () => {
        let expected: any;
        let model: EventModel;
        let generator: any;

        beforeEach(() => {
            expected = {
                startTime: TestDates._1970_01_01_ISO,
                endTime: TestDates._1970_01_02_ISO,
                title: 'title and space',
                description: 'description and space',
                address: 'address and space'
            };

            model = <EventModel> {
                title: expected.title,
                description: expected.description,
                address: expected.address,
                start: TestDates._1970_01_01,
                end: TestDates._1970_01_02
            };

            generator = new YahooCalendarGenerator(model);
        });

        describe('href', () => {
            it('should be a valid url', () => {
                // Arrange
                let expectedUrl = encodeURI(
                    `${YAHOO_URL}&title=${expected.title}&st=${generator.startTime}&dur=${generator.getYahooEventDuration()}&desc=${expected.description}&in_loc=${expected.address}&url=`);

                // Act
                let url = generator.href;

                // Assert
                expect(url).toBe(expectedUrl);
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
