import React from 'react';
import axios from 'axios';
import utils from '../utils/notifications';
import {firebase} from './MasterForm';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.userId,
      projects: []
    }
  }

  componentDidMount() {
    // var ref = firebase.database().ref();
    // var usersRef = ref.child('users');
    // var projectsRef = ref.child('projects');

    // const projects = usersRef.child(this.state.user).on('value', function(snapshot) {
    //   console.log(snapshot.val());
    // })
  }

  render() {
    return (
      <div>User Profile Component!</div>
    )
  }
}

export default ProfileView;