import React from 'react';
import axios from 'axios';

//////////////////////////////////////////////
// Verifier emails
///////////////////////////////////////////////

const notificationVerifyRequest = (details) => {
  const emailTemplate = `Hi, ${details.verifierName.split(' ').slice(0, -1).join(' ')}<br/><br/>
  Your contact ${details.creatorName} has requested your assistance in verifiying their contribution on the following project: <br/>
  <b>${details.projectName}</b> </br>
  <br/>
  Please take a moment to verify by clicking the following link:<br/>
  <a href="https://kredapp-740e9.firebaseapp.com/verify?projectId=${details.newProjectId}">http://www.kredapp.com/verify</a>`;

  const options = {
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
            "email": `${details.verifierEmail}`}],
        "subject": `Verification request from ${details.creatorName}`
      }
    ],
    "from": {
      "email": "verifyme@kredapp.com"
    },
    "content": [
      {
        "type": "text/html",
        "value": emailTemplate
      }
    ]
  },
  options
  ).then((response) => {
    console.log(response);
  })
}


module.exports = {
  notificationVerifyRequest: notificationVerifyRequest
}







