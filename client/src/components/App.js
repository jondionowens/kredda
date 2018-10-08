import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import queryString from 'query-string';
import MasterForm from './MasterForm';

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
            <Route path='/' component={MasterForm} />
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App;