import {} from "jasmine";

import {EventModel} from "../model/event.model";
import {IcsCalendarGenerator} from "./ics-calendar.generator";
import {TestDates} from "./test-dates";

describe("add2Calendar", () => {
    describe("ics-calendar.generator", () => {
        describe("href", () => {
            it("should be a valid blob url", () => {
                // Arrange
                const expected = {
                    address: "address and space",
                    description: "description and space",
                    documentURL: "www.com",
                    endTime: TestDates._1970_01_02_ISO_W_TZ,
                    startTime: TestDates._1970_01_01_ISO_W_TZ,
                    title: "title and space",
                };

                const model = {
                    address: expected.address,
                    description: expected.description,
                    end: TestDates._1970_01_02,
                    start: TestDates._1970_01_01,
                    title: expected.title,
                    url: expected.documentURL,
                } as EventModel;

                const generator = new IcsCalendarGenerator(model);

                const expectedBlobUrl = encodeURI(
                    "data:text/calendar;charset=utf8," + [
                        "BEGIN:VCALENDAR",
                        "VERSION:2.0",
                        "BEGIN:VEVENT",
                        `URL:${expected.documentURL}`,
                        `DTSTART:${expected.startTime.toString()}`,
                        `DTEND:${expected.endTime.toString()}`,
                        `SUMMARY:${expected.title}`,
                        `DESCRIPTION:${expected.description}`,
                        `LOCATION:${expected.address}`,
                        "END:VEVENT",
                        "END:VCALENDAR"].join("\n"));

                // Act
                const blobUrl = generator.href;

                // Assert
                expect(blobUrl).toBe(expectedBlobUrl);
            });
        });
    });
});
