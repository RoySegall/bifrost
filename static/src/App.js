import React from 'react';
import Header from './Components/Header'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import isLoggedIn from './Services/auth'

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
        };
    }

    async componentDidMount() {
        this.setState({isLoggedIn: await isLoggedIn()});
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div className="App">
                    <Header/>
                    <Home/>
                </div>
            );
        }

        return (
            <div className="App">
                <Login />
            </div>
        )
    }
}
