import React from "react";
import moment from 'moment';
import {dateFormatWithHour} from '../../Services/consts';


const Head = (props) => {
    return <h2> {props['title']}, starts at: {moment(props['startingDate']).format(dateFormatWithHour)} </h2>
};

export default Head;
