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

  username() {
    return <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
          Username
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          onChange={(event) => {
            this.setState({username: event.currentTarget.value})
          }}
          id="username"

          aria-describedby="emailHelp"
          placeholder="Enter username"
          className="
                bg-gray-200 appearance-none
                border-2 border-gray-200 rounded
                w-full py-2 px-4
                text-black leading-tight
                focus:outline-none focus:bg-white focus:border-purple-500

          " type="text" />
      </div>
    </div>
  }

  password() {
    return <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
          Password
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={(event) => {
            this.setState({password: event.currentTarget.value})
          }}
          className="
            bg-gray-200 appearance-none border-2 border-gray-200
            rounded w-full py-2 px-4 text-gray-700 leading-tight
            focus:outline-none focus:bg-white focus:border-purple-500
          " />
      </div>
    </div>
  }

  submitButton() {
    return <div className="md:flex md:items-center">
      <div className="md:w-1/3"></div>
      <div className="md:w-2/3">
        <button className="button" type="button"onClick={(event) => {
          this.login(event)
        }}>Sign Up</button>
      </div>
    </div>
  }

  render() {
    return <div>
      <FormError type={this.state.errors.type} message={this.state.errors.message}/>

      <form className="w-full max-w-sm p-4 m-auto m-0">
        {this.username()}
        {this.password()}
        {this.submitButton()}
      </form>
    </div>
  }

}
