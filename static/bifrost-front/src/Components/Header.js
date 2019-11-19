import React from 'react';

function Header() {
    return <header className="header">
        <div className="row">
            <div className="col-6">
                <h1>Welcome, dummy</h1>
            </div>

            <div className="col-6 menu text-right">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <i className="fal fa-user-cog"></i> <a
                        href="/settings">Settings</a>
                    </li>
                    |
                    <li className="list-inline-item">
                        <i className="fal fa-sign-out"></i> <a
                        href="auth/logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>

        <hr/>
    </header>;
}

export default Header;
