import moment from 'moment'

const dateFormat = "D-M-YYYY";
const dateFormatWithHour = "D-M-YYYY HH:mm";
const dateFormatWithDay = "D-M-YYYY, dddd";
const dateFormatOnlyHour = "HH:mm";
const dateFromBackend = "YYYY-M-DTHH:mm:ss";


/**
 * Getting a string from the backend and converting it to moment UTC object.
 *
 * @param date
 *  The date string.
 * @param format
 *  Default date format
 */
const convertFromBackendToUtc = (date, format="YYYY-M-DDTHH:mm:ss") => {
    return moment.utc(date, format);
};

export {
    dateFormat,
    dateFormatWithHour,
    dateFormatOnlyHour,
    dateFormatWithDay,
    dateFromBackend,
    convertFromBackendToUtc
};
