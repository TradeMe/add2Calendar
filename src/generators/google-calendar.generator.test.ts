import {} from 'jasmine';

import {GOOGLE_URL, GoogleCalendarGenerator} from "./google-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestConstants} from "./test-constants";

describe('add2Calendar', () => {
    describe('google-calendar.generator', () => {
        describe('href', () => {
            it('should be a valid url', () => {
                // Arrange
                let expected = {
                    startTime: TestConstants.isoDate_1970_01_01,
                    endTime: TestConstants.isoDate_1970_01_02,
                    title: 'title and space',
                    description: 'description and space',
                    address: 'address and space'
                };

                let model = <EventModel> {
                    title: expected.title,
                    description: expected.description,
                    address: expected.address,
                    start: TestConstants.date_1970_01_01,
                    end: TestConstants.date_1970_01_02
                };

                let generator = new GoogleCalendarGenerator(model);

                let expectedUrl = encodeURI(
                    `${GOOGLE_URL}&text=${expected.title}&dates=${expected.startTime}/${expected.endTime}&details=${expected.description}&location=${expected.address}&sprop=&sprop=name:`);

                // Act
                let url = generator.href;

                // Assert
                expect(url).toBe(expectedUrl);
            });
        });
    });
});
