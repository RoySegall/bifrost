import React from 'react';

function Login() {
    return <>
        Please <a href={process.env.REACT_APP_BACKEND + "/auth/login"}>login</a>
    </>
}

export default Login;
