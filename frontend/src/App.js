import React, { Component } from 'react';
import api from './services/api';

export default class App extends Component {
  state = {
    result: '',
    name: ''
  }

  handleResponse = async e => {
    const response = await api.post('/sessions', {
      email: 'lucas@gmail.com',
      password: '1234'

    });

    console.log(response);
      this.setState({
        result: response,
        name: response.data.user.name
      })
    };

  render(){
    const { result, name } = this.state;

    return (
        <>
          <button onClick={this.handleResponse}></button>
          <h1>{name}</h1>
        </>
      );
  }
}



