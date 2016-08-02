import React from "react";

import PeopleStore from "../stores/PeopleStore";
import Dropzone from 'react-dropzone';
import Clear from 'react-icons/lib/md/clear';
import Edit from 'react-icons/lib/md/mode-edit';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {id: 0}, preview: '', uploadInProgress: false };
    this.getProfile = this.getProfile.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.cancelDrop = this.cancelDrop.bind(this);
    PeopleStore.getAll();
  }

  componentWillMount() {
    PeopleStore.on("received", this.getProfile);
    PeopleStore.on("error", this.showError);
  }

  componentWillUnmount() {
    PeopleStore.removeListener("received", this.getProfile);
    PeopleStore.removeListener("error", this.showError);
  }

  getProfile() {
    // TODO: set to the current user id instead of 1
    var id = 1;
    if (this.props.params.hasOwnProperty("id")) {
      id = this.props.params.id;
    }
    var profiles = PeopleStore.people.filter((profile) => {
      return profile.id == id;
    })

    var photo = profiles[0].photo;
    
    if (photo == undefined) {
      photo = "https://u.o0bc.com/avatars/stock/_no-user-image.gif";
    }

    this.setState({
      profile: profiles[0],
      preview: photo,
    });
  }

  showError(){
    console.log(PeopleStore.error);
  }

  onDrop(files) {
    this.setState({
      preview: files[0].preview,
      uploadInProgress: true
    })
  }
  
  cancelDrop(e) {
    e.stopPropagation();
    this.setState({
      preview: this.state.profile.photo,
      uploadInProgress: false
    });
  }

  submitChanges() {
    // TODO: verify this is our profile

    // TODO: ajax call to update profile
    var profile = this.state.profile;
    var form = $('.profile');
    profile['description'] = form.find('.description').text();
    profile['organization'] = form.find('.organization').text();

    // TODO: ajax call to set photo
    /*var req = request.post('/upload');
    files.forEach((file)=> {
        req.attach(file.name, file);
    });
    req.end(callback);*/

    // onSuccess:
    this.setState({
      profile: profile
    });
  }

  render() {
    if (this.state.profile.private) {
      return;
    }

    const {id, first_name, last_name, organization, points, description} = this.state.profile;

    // TODO: determine if this is my profile or not
    const myProfile = id == 1;

    const displayCancel = myProfile && this.state.uploadInProgress ? "visible" : "hidden";
    const myProfileClass = myProfile ? "myProfile" : "";
    
    const buttonIcon = React.createElement(Clear, null);
    const editIcon = React.createElement(Edit, null);

    return (
      <div className={"profile " + myProfileClass}>
        <Dropzone className='dropzone' onDrop={this.onDrop} multiple={false} disableClick={!myProfile}>
          <img src={this.state.preview}/>
          <button className={"cancel " + displayCancel}  onClick={this.cancelDrop}>{buttonIcon}</button>
          <p className="label">Upload new photo</p>
        </Dropzone>
        <h2>{first_name} {last_name}</h2>
        <h4>Points: {points}</h4>
        <div className="editableContainer profileItem">
          <h3 contentEditable={myProfile} className="organization editable">{organization}</h3>
          <div className="editIcon">{editIcon}</div>
        </div>
        <div className="socialMediaContainer profileItem"></div>
        <div className="editableContainer profileItem">
          <p contentEditable={myProfile} className="description editable">{description}</p>
          <div className="editIcon">{editIcon}</div>
        </div>

        <button className="submitChanges" onClick={this.submitChanges}>Save changes</button>
      </div>
    );
  }
}
