import {} from 'jasmine';

import {GOOGLE_URL, GoogleCalendarGenerator} from "./google-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestDates} from "./test-dates";

describe('add2Calendar', () => {
    describe('google-calendar.generator', () => {
        describe('href', () => {
            it('should be a valid url', () => {
                // Arrange
                let expected = {
                    startTime: TestDates._1970_01_01_ISO,
                    endTime: TestDates._1970_01_02_ISO,
                    title: 'title and space',
                    description: 'description and space',
                    address: 'address and space'
                };

                let model = <EventModel> {
                    title: expected.title,
                    description: expected.description,
                    address: expected.address,
                    start: TestDates._1970_01_01,
                    end: TestDates._1970_01_02
                };
debugger;
                let generator = new GoogleCalendarGenerator(model);

                let expectedUrl = encodeURI(
                    `${GOOGLE_URL}&text=${expected.title}&dates=${expected.startTime}/${expected.endTime}&details=${expected.description}&location=${expected.address}&sprop=`);

                // Act
                let url = generator.href;

                // Assert
                expect(url).toBe(expectedUrl);
            });
        });
    });
});
