import React from 'react';
import axios from 'axios';
import FormError from './FormError';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errors: {
        type: null,
        message: '',
      },
    };
  }

  setError(error) {
    this.setState({errors: {type: 'error', message: error}});
  }

  setSuccess(message) {
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

    axios.post(`${process.env.REACT_APP_BACKEND}/auth/login`, {
      username: this.state.username,
      password: this.state.password,
    })
      .then(resp => {
        this.setSuccess('You are now logged!');
        localStorage.setItem('token', resp.data.token);
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      })
      .catch(error => {
        this.setError(`Something went wrong: ${error.response.data.error}`);
      })
  }

  render() {
    return <div>
      <FormError type={this.state.errors.type} message={this.state.errors.message}/>

      <div className="flex flex-row justify-between mt-2 mb-2">
        <form className="margin-0-auto w-6/12">
          <div className="flex-row pb-2">
            <label htmlFor="username" className="align-bottom mr-5 text-black font-bold">Username</label>
            <input type="text"
                   id="username"
                   onChange={(event) => {this.setState({username: event.currentTarget.value})}}
                   className="align-bottom m-4 p-2 ml-5 mb-0 pb-0 border-blue-500 border-b focus:bg-blue-100 w-3/4"
                   placeholder="Username"
            />
          </div>

          <div className="flex-row pb-2">
            <label htmlFor="username" className="align-bottom mr-5 text-black font-bold">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(event) => {this.setState({password: event.currentTarget.value})}}
              className="align-bottom m-4 p-2 ml-5 mb-0 pb-0 border-blue-500 border-b focus:bg-blue-100 w-3/4"
            />
          </div>

          <div className="flex-row text-center">
            <button className="mt-4 button" onClick={(event) => {this.login(event)}}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  }

}
