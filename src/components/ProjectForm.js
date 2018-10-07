import React from 'react';
import FormProjectInfo from './FormProjectInfo';
import FormVerifierInfo from './FormVerifierInfo';
import http from 'https';
import axios from 'axios';
import utils from '../utils/notifications'


class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      creatorName: '',
      projectName: '',
      projectRole: '',
      projectDate: '',
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
    if (this.state.step === 2) {
      utils.notificationVerifyRequest(this.state);
    } else if (this.state.step === 1) {
      this.setState({step: 2});
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
        <FormProjectInfo handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
      )
    }

    if (this.state.step === 2) {
      return (
        <FormVerifierInfo handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} goBack={this.goBack.bind(this)}/>
      )
    }
  }
}

export default ProjectForm;

