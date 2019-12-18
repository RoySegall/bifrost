import React from 'react';
import {Configuration, Logout} from '../Fonts'

function Header() {
    return <header className="header">
        <div className="row">
            <div className="col-6">
                <h1>Welcome, dummy</h1>
            </div>

            <div className="col-6 menu text-right">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        {Configuration()} <a href="/settings">Settings</a>
                    </li>
                    |
                    <li className="list-inline-item">
                        {Logout()} <a href="auth/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>

        <hr/>
    </header>;
}

export default Header;
