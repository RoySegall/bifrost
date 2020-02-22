import React from 'react';

function YesNo(flagValue) {
    return flagValue ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>
}

export default YesNo;
