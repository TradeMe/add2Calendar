'use strict';

import {} from 'jasmine';

import {BaseCalendarGenerator, DATE_POCTUATION_REGEX, MS_IN_MINUTES} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestConstants} from "./test-constants";

describe('add2Calendar', () => {

    describe('base-calendar.generator', () => {
        let model: EventModel;

        let getGenerator: () => BaseCalendarGenerator;

        beforeEach(() => {
            model = <EventModel> {
                start: TestConstants.date_1970_01_01,
                end: TestConstants.date_1970_01_02
            };
        });

        getGenerator = () => {
            return new BaseTestCalendarGenerator(model);
        };

        describe('constructor', () => {
            it('should assign the start and end dates', () => {
                // Arrange
                let expectedStartDate = TestConstants.isoDate_1970_01_01;
                let expectedEndDate = TestConstants.isoDate_1970_01_02;

                // Act
                let generator = <any> getGenerator();

                // Assert
                expect(generator.startTime).toBe(expectedStartDate);
                expect(generator.endTime).toBe(expectedEndDate);
            });
        });

        describe('formatTime', () => {
            it('should format the given time accordingly', () => {
                // Arrange
                let expectedDate = TestConstants.isoDate_1970_01_01;
                let date = TestConstants.date_1970_01_01;

                // Act
                let formatedDate = (<any>getGenerator()).formatTime(date);

                // Assert
                expect(formatedDate).toBe(expectedDate);
            });

            it('should throw a format error if the date is not informed', () => {
                // Arrange
                let expectedErrorMsgReg = /Cannot read property 'toISOString' of/;
                let generator = getGenerator();

                // Act + Assert
                expect(() => (<any> generator).formatTime(null)).toThrowError(expectedErrorMsgReg);
                expect((<any>generator).formatTime).toThrowError(expectedErrorMsgReg);
            });
        });

        describe('calculateEndTime', () => {
            it('should calculate the endTime accordingly if the end time is not provided', () => {
                // Arrange
                model.end = null;
                model.duration = 30;
                let expectedDate =
                    new Date(TestConstants.date_1970_01_01.getTime() + (model.duration * MS_IN_MINUTES))
                        .toISOString().replace(DATE_POCTUATION_REGEX, '');

                // Act
                let endDate = (<any> getGenerator()).calculateEndTime(model);

                // Assert
                expect(endDate).toBe(expectedDate);
            });

            describe('Invalid inputs', () => {
                let expected_getTime_ErrorMsgReg = /Cannot read property 'getTime' of/;
                let expected_end_ErrorMsgReg = /Cannot read property 'end' of/;
                let expectedInvalidTimeValueErrorMsgReg = /Invalid time value/;

                it('should throw an error for null or undefined entry', () => {
                    expect((<any> getGenerator()).calculateEndTime).toThrowError(expected_end_ErrorMsgReg);
                });

                it('should throw an error if the input is an empty object', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({})).toThrowError(expected_getTime_ErrorMsgReg);
                });

                it('should throw an error if input has no start date and no end date', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({duration: 30})).toThrowError(expected_getTime_ErrorMsgReg);
                });

                it('should throw an error if input has no duration and no end date', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({start: new Date()})).toThrowError(expectedInvalidTimeValueErrorMsgReg);
                });
            });
        });
    });
});

class BaseTestCalendarGenerator extends BaseCalendarGenerator {
    public href: string;
}