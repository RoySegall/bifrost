import React from 'react';
import Header from './Components/Header.js'
import Home from './Components/Home/Home'
import isLoggedIn from './Services/auth'

export default class App extends React.Component {

    componentDidMount() {
        if (!isLoggedIn()) {
            // todo: do something.
        }
    }

    render() {
        return (
            <div className="App">
                <Header />
                <Home />
            </div>
        );
    }
}

export default App;
