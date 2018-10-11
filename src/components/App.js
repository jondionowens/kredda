import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import queryString from 'query-string';
import {MasterForm} from './MasterForm';
import {MasterVerificationForm} from './MasterVerificationForm';
import {Login} from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    }
  }

  render() {
    if(this.state.currentStep === 1) {
      return (
        <BrowserRouter>
          <div>
            <Route exact path='/' component={MasterForm} />
            <Route path='/verify' component={MasterVerificationForm} />
            <Route path='/login' component={Login} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App;