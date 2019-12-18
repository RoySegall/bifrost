import React from 'react';
import axios from 'axios';
import FormError from './FormError';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: 'fal fa-sign-in',
            username: null,
            password: null,
            errors: {
                type: null,
                message: '',
            },
        };
    }

    setIcon(icon) {
        this.setState({icon: icon});
    }

    setError(error) {
        this.setIcon('fal fa-times text-danger');
        this.setState({errors: {type: 'danger', message: error}});
    }

    setSuccess(message) {
        this.setIcon('fal fa-check text-success');
        this.setState({errors: {type: 'success', message: message}});
    }

    resetError() {
        this.setState({errors: {type: null, message: null}});
    }

    login(event) {
        event.preventDefault();
        this.resetError();

        if (!this.state.username) {
            this.setError('Username is required');
            return;
        }

        if (!this.state.password) {
            this.setError('Password is required');
            return;
        }

        this.setIcon('fas fa-spinner fa-spin');

        axios.post(`${process.env.REACT_APP_BACKEND}/auth/login`, {
            username: this.state.username,
            password: this.state.password,
        })
            .then(resp => {
                this.setSuccess('You are now logged!');
                this.setIcon('fal fa-check text-success');
                localStorage.setItem('token', resp.data.token);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            })
            .catch(error => {
                this.setIcon('fal fa-check text-success');
                this.setError(`Something went wrong: ${error.response.data.error}`);
            })
    }

    render() {
        return <div className="login">
            <div className="icon">
                <i className={this.state.icon}></i>
            </div>
            <FormError type={this.state.errors.type} message={this.state.errors.message} />
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter username"
                        onFocus={() => {this.setIcon('fal fa-eye')}}
                        onChange={(event) => {this.setState({username: event.currentTarget.value})}}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        onFocus={() => {this.setIcon('fal fa-eye-slash')}}
                        onChange={(event) => {this.setState({password: event.currentTarget.value})}}
                    />
                </div>
                <div className="form-group actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(event) => {this.login(event)}}
                    >Log me in!</button>
                </div>
            </form>
        </div>
    }

}
