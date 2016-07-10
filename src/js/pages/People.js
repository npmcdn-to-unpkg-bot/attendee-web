import React from "react";

import PeopleStore from "../stores/PeopleStore";

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: PeopleStore.getAll(),
    };
  }

  componentWillMount() {
    PeopleStore.on("change", this.getPeople);
  }

  componentWillUnmount() {
    PeopleStore.removeListener("change", this.getPeople);
  }

  getPeople() {
    this.setState({
      data: PeopleStore.getAll(),
    });
  }

  reloadPeople() {
    HomeActions.reloadHome();
  }

  render() {
    const { home } = this.state;
    return (
      <div>
        <h1>People</h1>
        <PeopleList data={this.state.data} />
      </div>
    );
  }
}

var PeopleList = React.createClass({
  render: function() {
    var peopleNodes = this.props.data.map(function(person) {
      if (person.private) {
        return;
      }
      var photo = "https://u.o0bc.com/avatars/stock/_no-user-image.gif";
      if (person.hasOwnProperty('photo')) {
        photo = person.photo;
      }
      return (
        <Person name={person.name} photo={photo} points={person.points} organization={person.organization} />
      );
    });
    return (
      <div className="peopleList">
        {peopleNodes}
      </div>
    );
  }
});

var Person = React.createClass({
  render: function() {
    return (
      <div className="person">
        <img src={this.props.photo} />
        <p className="personName"> {this.props.name} </p>
        <p className="personPoints"> {this.props.points} </p>
        <p className="personOrg"> {this.props.organization} </p>
      </div>
    );
  }
});
