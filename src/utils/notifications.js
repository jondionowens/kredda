//////////////////////////////////////////////
// Verifier emails
///////////////////////////////////////////////

const notificationVerifyRequest = () => {
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