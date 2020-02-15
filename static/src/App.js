import React from 'react';
import Header from './Components/Header'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import {RouteTimeline} from './Components/Timeline/Timeline';
import isLoggedIn from './Services/auth'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './styles/main.scss';

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

        if (!this.state.isLoggedIn) {
            return <Login/>
        }

        return <Router>
            <Header />
            <Switch>
                <Route path="/timeline/:id" children={<RouteTimeline />}>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    }
}
