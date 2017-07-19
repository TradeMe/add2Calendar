import {} from 'jasmine';

import {BaseCalendarGenerator, MS_IN_MINUTES} from "./base-calendar.generator";
import {EventModel} from "../model/event.model";
import {TestDates} from "./test-dates";

describe('add2Calendar', () => {
    let expected_getTime_ErrorMsgReg = /Cannot read property 'getTime' of/;
    let expected_end_ErrorMsgReg = /Cannot read property 'end' of/;
    let expected_convertToGMT_ErrorMsgReg = /Cannot read property 'convertToGMT' of/;
    let expectedInvalidTimeValueErrorMsgReg = /Invalid time value/;
    let expected_invalidInterval_ErrorMsgReg = /You have to provide either the duration or end/;


    describe('base-calendar.generator', () => {
        let model: EventModel;

        let getGenerator: () => BaseCalendarGenerator;

        beforeEach(() => {
            model = <EventModel> {
                start: TestDates._1970_01_01,
                end: TestDates._1970_01_02
            };
        });

        getGenerator = () => {
            return new BaseTestCalendarGenerator(model);
        };

        describe('constructor', () => {
            it('should assign the start and end dates', () => {
                // Arrange
                let expectedStartDate = TestDates._1970_01_01_ISO_W_TZ;
                let expectedEndDate = TestDates._1970_01_02_ISO_W_TZ;

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
                let expectedDate = TestDates._1970_01_01_ISO_W_TZ;
                let date = TestDates._1970_01_01;

                // Act
                let formatedDate = (<any>getGenerator()).formatTime(date);

                // Assert
                expect(formatedDate).toBe(expectedDate);
            });

            it('should throw a format error if the date is not informed', () => {
                // Arrange
                let generator = getGenerator();

                // Act + Assert
                expect(() => (<any> generator).formatTime(null)).toThrowError(expected_getTime_ErrorMsgReg);
                expect((<any>generator).formatTime).toThrowError(expected_convertToGMT_ErrorMsgReg);
            });
        });

        describe('calculateEndTime', () => {
            it('should calculate the endTime accordingly if the end time is not provided', () => {
                // Arrange
                model.end = null;
                model.duration = 30;
                let expectedDate = (<any> getGenerator()).formatTime(
                    new Date(TestDates._1970_01_01.getTime() + (model.duration * MS_IN_MINUTES)));

                // Act
                let endDate = (<any> getGenerator()).calculateEndTime(model);

                // Assert
                expect(endDate).toBe(expectedDate);
            });

            describe('Invalid inputs', () => {

                it('should throw an error for null or undefined entry', () => {
                    expect((<any> getGenerator()).calculateEndTime).toThrowError(expected_end_ErrorMsgReg);
                });

                it('should throw an error if the input is an empty object', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({})).toThrowError(expected_invalidInterval_ErrorMsgReg);
                });

                it('should throw an error if input has no start date and no end date', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({duration: 30})).toThrowError(expected_getTime_ErrorMsgReg);
                });

                it('should throw an error if input has no duration and no end date', () => {
                    expect(() => (<any> getGenerator()).calculateEndTime({start: new Date()})).toThrowError(expected_invalidInterval_ErrorMsgReg);
                });
            });
        });
    });
});

class BaseTestCalendarGenerator extends BaseCalendarGenerator {
    public href: string;
}