import {DATE_POCTUATION_REGEX} from "./base-calendar.generator";

export class TestConstants {
    public static date_1970_01_01 = new Date(Date.UTC(1970, 1, 1));
    public static date_1970_01_02 = new Date(Date.UTC(1970, 1, 2));
    public static isoDate_1970_01_01 = TestConstants.date_1970_01_01.toISOString().replace(DATE_POCTUATION_REGEX, '');
    public static isoDate_1970_01_02 = TestConstants.date_1970_01_02.toISOString().replace(DATE_POCTUATION_REGEX, '');
}