import React from 'react';
import FormProjectInfo from './FormProjectInfo';
import FormVerifierInfo from './FormVerifierInfo';
import http from 'https';


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

      
    var req = http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    });
    
    req.write(JSON.stringify({ personalizations: 
       [ { to: [ { email: 'jo@jondionowens.com', name: 'John Doe' } ],
           subject: 'Worked!' } ],
      from: { email: 'sam.smith@example.com', name: 'Sam Smith' },
      reply_to: { email: 'sam.smith@example.com', name: 'Sam Smith' },
      content: [ { type: 'text/plain', value: 'Hello, World!' } ] }));
    req.end();


    
    //this.setState({step: 2});
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

