import React from "react";
import {IndexLink} from "react-router";
import PeopleStore from "../stores/PeopleStore";

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.getPeople = this.getPeople.bind(this);
    this.state = { people: [] };
    PeopleStore.getAll()
  }

  componentWillMount() {
    PeopleStore.on("received", this.getPeople);
    PeopleStore.on("error", this.showError);
  }

  componentWillUnmount() {
    PeopleStore.removeListener("received", this.getPeople);
    PeopleStore.removeListener("error", this.showError);
  }

  getPeople() {
    this.setState({
      people: PeopleStore.people
    })
  }

  showError(){
    console.log(PeopleStore.error)
  }

  render() {
    const { people } = this.state;
    return (
      <div>
        <h1>People</h1>
        <PeopleList data={people} />
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
        <Person name={person.name} photo={photo} points={person.points} organization={person.organization} profileID={person.id}/>
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
        <IndexLink to={{ pathname: 'people/' + this.props.profileID }}>
          <img src={this.props.photo} />
        </IndexLink>
        <p className="personName"> {this.props.name} </p>
        <p className="personPoints"> {this.props.points} </p>
        <p className="personOrg"> {this.props.organization} </p>
      </div>
    );
  }
});
