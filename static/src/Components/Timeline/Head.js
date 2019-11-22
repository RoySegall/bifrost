import React from "react";

const Head = (props) => {
    return <h2> {props['title']}, starts at: {props['startingDate']} </h2>
};

export default Head;
