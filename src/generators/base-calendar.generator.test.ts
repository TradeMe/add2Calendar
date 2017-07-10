'use strict';
import {BaseCalendarGenerator} from "./base-calendar.generator";

// describe('add2Calendar', () => {
//
//     let generator: BaseCalendarGenerator;
//
//     beforeEach(() => {
//         generator = new BaseTestCalendarGenerator(null);
//     });
//
//     describe('formatTime', () => {
//         it('should format the given time accordingly' , () => {
//             let date = new Date(1970, 1, 1);
//             let formatedDate = (<any>generator).formatTime(date);
//
//             expect(formatedDate).to.equal('');
//         });
//     });
//
//
//
// });

class BaseTestCalendarGenerator extends BaseCalendarGenerator {
    public href: string;
}