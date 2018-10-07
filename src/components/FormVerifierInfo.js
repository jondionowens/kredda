import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const FormVerifierInfo = (props) => {
  return (
    <div>
      <TextField id="verifierName" type="text" label="Verifier name" onChange={props.handleChange} /><br/>
      <TextField id="verifierRole" type="text" label="Verifier role" onChange={props.handleChange} /><br/>
      <TextField id="verifierEmail" type="text" label="Verifier email" onChange={props.handleChange} /><br/>
      <TextField id="requestMessage" label="Message" type="text" onChange={props.handleChange} /><br/><br/>
      <Button variant="contained" color="primary" onClick={props.goBack}>Back</Button>
      <Button variant="contained" color="primary" onClick={props.handleSubmit}>Next</Button>
    </div>
  )
}

export default FormVerifierInfo;