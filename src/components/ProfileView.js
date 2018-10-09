import React from 'react';
import axios from 'axios';
import utils from '../utils/notifications';
import firebase from '../database/db.js';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: props.userId,
      user: '-LOPS342YelDQCwBafda',
      projects: {}
    }
  }

  componentDidMount() {
    this.getUserProjects(this.state.user);
  }
  
  getUserProjects(userId) {
    console.log(this)
    var ref = firebase.database().ref();
    var usersRef = ref.child('users');
    var projectsRef = ref.child('projects');
    const that = this;
    
    const projects = usersRef.child(this.state.user).on('value', function(snapshot) {
      that.setState({projects: snapshot.val().projects.creator})
    });
    console.log(projects)
  }

  render() {
    return (
      <div>User Profile Component!</div>
    )
  }
}

export default ProfileView;