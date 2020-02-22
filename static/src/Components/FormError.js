import React from 'react';

function FormError(props) {
  const type = props['type'];
  const message = props['message'];

  if (!type) {
    return <></>;
  }

  const baseColor = type === 'error' ? 'alert-error' : 'alert-success';
  const icon = type === 'error' ? 'fal fa-times text-2xl' : 'fal fa-check text-2xl';

  return <div className={`${baseColor} m-auto m-0 mt-4 mb-4`}
              role="alert">
    <div className="flex">
      <div className="py-1 pr-4">
        <i className={icon}></i>
      </div>
      <div>
        <p className="text-2xl">{message}</p>
      </div>
    </div>
  </div>

  return <div className={`alert alert-${type}`} role="alert">{message}</div>
}

export default FormError;
