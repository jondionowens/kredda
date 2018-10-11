import React from 'react';
import UserForm from './UserForm'
import ProjectForm from './ProjectForm';
import VerifierForm from './VerifierForm';
import ProfileView from './ProfileView'
import axios from 'axios';
import utils from '../utils/notifications';
import firebase from '../database/db.js';
class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      creatorName: '',
      projectName: '',
      role: '',
      projectDescription: '',
      creatorEmail: '',
      verifierName: '',
      verifierEmail: '',
      message: ''
    }
  };

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
        this.setState({newProjectId: projectRef.key}, () => {
          console.log(this.state.newProjectId);
        });
        usersRef.child(this.state.userRef+'/projects/creator').push(projectRef.key)
          .then((snapshot) => {
            this.setState({step: 3});
          })
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
        <UserForm handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
      )
    }

    if (this.state.step === 2) {
      return (
        <ProjectForm handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} goBack={this.goBack.bind(this)}/>
      )
    }

    if (this.state.step === 3) {
      return (
        <VerifierForm handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} goBack={this.goBack.bind(this)}/>
      )
    }

    if (this.state.step === 4) {
      return (
        <ProfileView userId={this.state.userRef} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} verified={false}/>
      )
    }
  }
}

module.exports = {
  MasterForm: MasterForm,
  firebase: firebase
}

