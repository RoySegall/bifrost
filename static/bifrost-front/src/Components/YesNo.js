import React from 'react';

function YesNo(flagValue) {
    return flagValue ? <span className="yes">Yes</span> : <span className="no">No</span>
}

export default YesNo;
