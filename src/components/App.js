import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
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
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/new'>New Project</Link></li>
            <li><Link to='/verify'>Verify Project</Link></li>
          </ul>

          <hr />

          <Route path='/' component={Home} />
          <Route path='/new' component={NewProject} />
          <Route path='/verify' component={VerifyProject} />
        </div>
      </Router>
    )
  }
}

export default App;

