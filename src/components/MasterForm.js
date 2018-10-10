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
      } else {
        alert('All fields required');
      }
    }
  };

  goBack() {
    this.setState({step: 1});
  }

  notificationVerifyRequest() {
    var options = {
      "method": "POST",
      "hostname": "api.sendgrid.com",
      "port": null,
      "path": "/v3/mail/send",
      "headers": {
        "authorization": "Bearer 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",
        "content-type": "application/json"
      }
    }

    axios.post('https://api.sendgrid.com/v3/mail/send', 
    {"personalizations": [
        {
          "to": [{
              "email": "jo@jondionowens.com"}],
          "subject": "Using Axios"
        }
      ],
      "from": {
        "email": "from_address@example.com"
      },
      "content": [
        {
          "type": "text/plain",
          "value": "Axios son...."
        }
      ]
    },
    options
    ).then((response) => {
      console.log(response);
    })
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

