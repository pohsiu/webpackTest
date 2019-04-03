import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    console.log('Hello');
    axios({
      method:'get',
      url:'/calendar',
    })
      .then(function (response) {
        console.log('res', response);
      })
      .catch(e => {
        console.log('er', e);
      }) 
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
