import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const UserFormInfo = (props) => {
  return (
    <div>
      <h3>Get started</h3>
      <TextField id="creatorName" type="text" label="Your name" onChange={props.handleChange} /><br/>
      <TextField id="creatorEmail" type="text" label="Your email" onChange={props.handleChange} /><br/><br/>
      <Button variant="contained" color="primary" onClick={props.handleSubmit}>Next</Button>
    </div>
  )
}

export default UserFormInfo;