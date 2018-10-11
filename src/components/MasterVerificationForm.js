import React from 'react';
import axios from 'axios';
import utils from '../utils/notifications';
import firebase from '../database/db.js';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import queryString from 'query-string';

const VerificationForm = (props) => {
  return (
    <div>
      <h2>Do you verify this claim?</h2>
      <Button variant="contained" color="primary" onClick={props.handleAccept}>Yes</Button>
      <Button variant="contained" color="primary" onClick={props.handleDecline}>No</Button>
    </div>
  )
}

const GoodByeMessage = (props) => {
  return (
    <div>
      <h2>Thanks for your input!</h2>
    </div>
  )
}

class MasterVerificationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      user: props.userId,
      projects: [],
      isLoading: true
    }
  };


  // set up click handlers for verify and decline
  // verify
    // reaches out to the project on firebase and updates it's "verified" prop

  handleAccept() {
    const queryParams = queryString.parse(location.search);
    var ref = firebase.database().ref();
    var projectsRef = ref.child('projects');
    projectsRef.child(queryParams.projectId).update({verified: true})
      .then(() => {
        this.setState({step: 2});
      })
  }

  handleDecline() {
    
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
    var projectsRef = ref.child('projects');
    
    if (this.state.step === 1) {
      if (this.state.creatorName && this.state.creatorEmail) {
        const newUser = {
          firstName: this.state.creatorName.split(' ').slice(0, -1).join(' '),
          lastName: this.state.creatorName.split(' ').slice(-1).join(' '),
          email: this.state.creatorEmail,
        }
        const userRef = usersRef.push(newUser);
        this.setState({step: 2, userRef: userRef.key});
      } else {
        alert('All fields required');
      }
    }
    
    if (this.state.step === 2) {
      if (this.state.projectName && this.state.role && this.state.projectDescription) {
        const newProject = {
          projectName: this.state.projectName,
          description: this.state.projectDescription,
          verified: false
        }
        const projectRef = projectsRef.push(newProject);
        
        usersRef.child(this.state.userRef+'/projects/creator').push(projectRef.key);
        this.setState({step: 3, projectRef: projectRef.key});
      } else {
        alert('All fields required');
      }
    }

    if (this.state.step === 3) {
      if (this.state.verifierName && this.state.verifierEmail) {
        const newVerifier = {
          firstName: this.state.verifierName.split(' ').slice(0, -1).join(' '),
          lastName: this.state.verifierName.split(' ').slice(-1).join(' '),
          email: this.state.verifierEmail,
        }
        const verifierRef = usersRef.push(newVerifier);
        this.setState({verifierRef: verifierRef.key}, () => {
          usersRef.child(this.state.verifierRef+'/projects/verifier').push(this.state.projectRef);
        });
        
        this.setState({step: 4});
        utils.notificationVerifyRequest(this.state);
      } else {
        alert('All fields required');
      }
    }
  };

  goBack() {
    this.setState({step: 1});
  }

  render() {
    if (this.state.step === 1) {
      return (
        <VerificationForm handleAccept={this.handleAccept.bind(this)} handleDecline={this.handleDecline.bind(this)}/>
      )
    }

    if (this.state.step === 2) {
      return (
        <GoodByeMessage />
      )
    }
    }
  }

module.exports = {
  MasterVerificationForm: MasterVerificationForm,
  firebase: firebase
}

