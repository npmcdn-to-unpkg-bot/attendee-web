import React from "react";

import PeopleStore from "../stores/PeopleStore";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {id: 0} };
    this.getProfile = this.getProfile.bind(this);
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
    this.setState({
      profile: profiles[0]
    });
  }

  showError(){
    console.log(PeopleStore.error);
  }

  render() {
    if (this.state.profile.private) {
      return;
    }

    const {id, first_name, last_name, organization, points, description} = this.state.profile;
    var {photo} = this.state.profile;
    
    if (photo == undefined) {
      photo = "https://u.o0bc.com/avatars/stock/_no-user-image.gif";
    }

    return (
      <div className="profile">
        <img src={photo}/>
        <h2>{first_name} {last_name}</h2>
        <h3>{organization}</h3>
        <h4>Points: {points}</h4>
        <div className="socialMediaContainer">
        </div>
        <p className="description">{description}</p>
      </div>
    );
  }
}
