import React from "react";

import PeopleStore from "../stores/PeopleStore";

export default class Profile extends React.Component {
  constructor() {
    super();
    this.getProfile = this.getProfile.bind(this);
    PeopleStore.get(this.props.param.profileID);
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
    var id = this.props.param.profileID;
    var profile = PeopleStore.people.filter((profile) => {
      return profile.id == id;
    })
    this.setState({
      profile: profile
    })
  }

  showError(){
    console.log(PeopleStore.error)
  }

  render() {
    const { id, name, description, email, organization, photo, points} = this.props;

    return (
      <div>
        <h1>Profile {name}</h1>
      </div>
    );
  }
}
