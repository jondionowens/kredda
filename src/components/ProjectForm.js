import React from 'react';
import FormProjectInfo from './FormProjectInfo';
import FormVerifierInfo from './FormVerifierInfo';
import http from 'https';
import axios from 'axios';


class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      projectName: '',
      projectRole: '',
      projectDate: '',
      verifierName: '',
      verifierEmail: '',
      messageToVerifier: ''
    }
  };

  handleChange(e) {
    const targetField = e.target.id;
    const stateChange = {};
    stateChange[targetField] = e.target.value;
    this.setState(stateChange);
  };

  handleSubmit(e) {

  };

  

  render() {
    if (this.state.step === 1) {
      return (
        <FormProjectInfo handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
      )
    }

    if (this.state.step === 2) {
      return (
        <FormVerifierInfo handleChange={this.handleChange} handleSubmit={this.handleSubmit.bind(this)}/>
      )
    }
  }
}

export default ProjectForm;

