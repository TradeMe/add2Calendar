import {} from 'jasmine';

import {EventModel} from "../model/event.model";
import {TestDates} from "./test-dates";
import {IcsCalendarGenerator} from "./ics-calendar.generator";

describe('add2Calendar', () => {
    describe('ics-calendar.generator', () => {
        describe('href', () => {
            it('should be a valid blob url', () => {
                // Arrange
                let expected = {
                    startTime: TestDates._1970_01_01_ISO_W_TZ,
                    endTime: TestDates._1970_01_02_ISO_W_TZ,
                    title: 'title and space',
                    description: 'description and space',
                    address: 'address and space',
                    documentURL: 'www.com'
                };

                let model = <EventModel> {
                    title: expected.title,
                    description: expected.description,
                    address: expected.address,
                    start: TestDates._1970_01_01,
                    end: TestDates._1970_01_02,
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
