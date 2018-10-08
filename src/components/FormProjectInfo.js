import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const FormProjectInfo = (props) => {
  return (
    <div>
      <TextField id="creatorName" type="text" label="Your name" onChange={props.handleChange} /><br/>
      <TextField id="creatorEmail" type="text" label="Your email" onChange={props.handleChange} /><br/>
      <TextField id="projectName" type="text" label="Project name" onChange={props.handleChange} /><br/>
      <TextField id="role" type="text" label="Your role" onChange={props.handleChange} /><br/>
      <TextField id="projectDescription" label="Project description" type="text" onChange={props.handleChange} /><br/><br/>
      <Button variant="contained" color="primary" onClick={props.handleSubmit}>Next</Button>
    </div>
  )
}

export default FormProjectInfo;