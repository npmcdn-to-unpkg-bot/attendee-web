import React from "react";

import PeopleStore from "../stores/PeopleStore";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {name: "", id: 0} };
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
    const {id, name} = this.state.profile;
    return (
      <div>
        <h1>Profile: {name}</h1>
      </div>
    );
  }
}
