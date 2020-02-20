import React from "react";
import {dateFormatWithHour, convertFromBackendToUtc} from '../../Services/consts';

const Head = (props) => {
    const date = convertFromBackendToUtc(props['startingDate'])
      .format(dateFormatWithHour);

    return <h2 className="text-4xl">
        {props['title']}, starts at: {date}
    </h2>
};

export default Head;
