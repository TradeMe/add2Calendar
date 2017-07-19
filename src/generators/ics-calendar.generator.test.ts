import {} from 'jasmine';

import {EventModel} from "../model/event.model";
import {TestConstants} from "./test-constants";
import {IcsCalendarGenerator} from "./ics-calendar.generator";

describe('add2Calendar', () => {
    describe('ics-calendar.generator', () => {
        describe('href', () => {
            it('should be a valid blob url', () => {
                // Arrange
                let expected = {
                    startTime: TestConstants.isoDate_1970_01_01,
                    endTime: TestConstants.isoDate_1970_01_02,
                    title: 'title and space',
                    description: 'description and space',
                    address: 'address and space',
                    documentURL: 'www.com'
                };

                let model = <EventModel> {
                    title: expected.title,
                    description: expected.description,
                    address: expected.address,
                    start: TestConstants.date_1970_01_01,
                    end: TestConstants.date_1970_01_02,
                    url: expected.documentURL
                };

                let generator = new IcsCalendarGenerator(model);

                let expectedBlobUrl = encodeURI(
                    'data:text/calendar;charset=utf8,' + [
                        'BEGIN:VCALENDAR',
                        'VERSION:2.0',
                        'BEGIN:VEVENT',
                        `URL:${expected.documentURL}`,
                        `DTSTART:${expected.startTime.toString()}`,
                        `DTEND:${expected.endTime.toString()}`,
                        `SUMMARY:${expected.title}`,
                        `DESCRIPTION:${expected.description}`,
                        `LOCATION:${expected.address}`,
                        'END:VEVENT',
                        'END:VCALENDAR'].join('\n'));

                // Act
                let blobUrl = generator.href;

                // Assert
                expect(blobUrl).toBe(expectedBlobUrl);
            });
        });
    });
});
