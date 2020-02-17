import React from 'react';
import {Configuration, Logout} from '../Fonts'

function Header() {
  return <header>
    <div className="container grid grid-cols-2 gap-6 pt-2 pb-3">

      <div>
        <h1 className="text-4xl">Welcome, dummy</h1>
      </div>

      <div>
        <div className="flex flex-row justify-center">
          <div className="text-2xl">{Configuration()} <a href="/settings">Settings</a></div>
          <div className="text-2xl ml-4">{Logout()} <a href="auth/logout">Logout</a></div>
        </div>
      </div>

    </div>

    <hr className="bg-red-500"/>
  </header>;
}

export default Header;
