import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../database/db.js';
import ProfileView from './ProfileView'
import _ from 'lodash';

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      step: 1,
      userId: {}
    }
  }

  handleChange(e) {
    const targetField = e.target.id;
    const stateChange = {};
    stateChange[targetField] = e.target.value;
    this.setState(stateChange);
  };

  handleSubmit(e) {
    var ref = firebase.database().ref();
    var usersRef = ref.child('users');
    usersRef.orderByChild('email')
    .equalTo('jo@jondionowens.com')
    .on('value', (snapshot) => {
      const loggedInUser = Object.keys(snapshot.val())[0];
      this.setState({userId: loggedInUser, step: 2}); 
    })
  }

  render() {

    if (this.state.step === 1) {
      return (
        <div>
          <h3>User Login</h3>
          <TextField id="userEmail" type="text" label="Email Address" onChange={this.handleChange.bind(this)} /><br/><br/>
          <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>Next</Button>
        </div>
      )
    }

    if (this.state.step === 2) {
      return (
        <ProfileView userId={this.state.userId} />
      )
    }
    
  }
}

module.exports = {
  Login: Login
}