import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route, Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h2>Homes</h2>
    </div>
  )
};

const ProjectForm = () => {
  return (
    <div>
      <h2>Project Form</h2>
    </div>
  )
};

const VerifyForm = () => {
  return (
    <div>
      <h2>Verify Form</h2>
    </div>
  )
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'hme'
    }
  }

  render() {
    if(this.state.current === 'home') {
      return (
       <div>hello</div>
      );
    } else {
      return (
        <div>bye</div>
      );
    }
  }
}

export default App;



