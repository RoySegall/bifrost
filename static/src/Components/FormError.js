import React from 'react'

function FormError(props) {
    const type = props['type'];
    const message = props['message'];

    if (!type) {
        return <></>;
    }

    return <div className={`alert alert-${type}`} role="alert">{message}</div>
}

export default FormError;