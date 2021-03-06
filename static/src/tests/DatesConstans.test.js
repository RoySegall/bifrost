import {
    dateFormat,
    dateFormatWithHour,
    dateFormatOnlyHour,
    dateFormatWithDay,
    convertFromBackendToUtc
} from '../Services/consts';
import * as moment from 'moment';

export const June2519891030 = 614773800;

test("Check date dateFormat format", () => {
    expect(
        moment.unix(June2519891030).utc(false).format(dateFormat)
    ).toBe('25-6-1989')
});

test("Check date dateFormatWithHour format", () => {
    expect(
        moment.unix(June2519891030).utc(false).format(dateFormatWithHour)
    ).toBe('25-6-1989 10:30')
});

test("Check date dateFormatOnlyHour format", () => {
    expect(
        moment.unix(June2519891030).utc(false).format(dateFormatOnlyHour)
    ).toBe('10:30')
});

test("Check date dateFormatWithDay format", () => {
    expect(
        moment.unix(June2519891030).utc(false).format(dateFormatWithDay)
    ).toBe('25-6-1989, Sunday')
});

test("Check we can convert dates from the server to UTC", () => {
    expect(convertFromBackendToUtc("2019-06-25T12:00:00").unix()).toBe(1561464000)
});
