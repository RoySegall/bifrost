import React from 'react';
import {Configuration, Logout} from '../Fonts'
import {Logout as userLogout} from '../Services/auth';

function Header() {
  return <header>

    <div className="container mx-auto flex items-end pb-2 pt-2 mt-2 border-teal-1000 border-b">
      <h1 className="flex-1 text-red-1000 font-bold text-4xl">Welcome, dummy</h1>

      <div className="flex justify-between text-2xl">
        <div className="mr-2 mt-1">
          <span className="text-red-1000 mr-1">{Configuration()}</span>
          <a href="/settings">Settings</a> |
        </div>

        <div className="mr-2 mt-1">
          <span className="text-red-1000 mr-1">{Logout()}</span>
          <a href="auth/logout" onClick={userLogout} id="logout">Logout</a>
        </div>
      </div>
    </div>
  </header>;
}

export default Header;
