import React from "react";
import {dateFormatWithHour, convertFromBackendToUtc} from '../../Services/consts';


const Head = (props) => {
    return <h2> {props['title']}, starts at: {convertFromBackendToUtc(props['startingDate']).format(dateFormatWithHour)} </h2>
};

export default Head;
