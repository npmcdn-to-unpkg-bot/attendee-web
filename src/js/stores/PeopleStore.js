import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PeopleStore extends EventEmitter {
  constructor() {
    super()
    this.people = [
      {
        id: 1,
        name: "Clarisse Schneider",
        email: "clarissemschneider@gmail.com",
        organization: "University of Waterloo",
        photo: "https://scontent-yyz1-1.xx.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/13407145_10209959963904765_7384170056158382366_n.jpg?oh=10ede74cea8311ee19e790d58268db93&oe=57FD02A5",
        points: 500,
        fb: "https://www.facebook.com/schneider.clarisse",
        twitter: "https://twitter.com/claryschneider",
        linkedin: "https://ca.linkedin.com/in/clarisse-schneider-03548627",
        description: "I'm so pumped to be working at SE Hack Day! #sehackday",
        private: false,
      },
      {
        id: 2,
        name: "Adam Key",
        organization: "Google",
        points: 0,
        private: false,
      },
    ];
  }

  getAll() {
    return this.people;
  }

  getPersonById(id) {
    return this.people.filter(
      function(data) {
        return data.id == id;
      }
    );
  }

  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_PEOPLE": {
        this.people = action.people;
        this.emit("change");
        break;
      }
    }
  }
}
const peopleStore = new PeopleStore;
dispatcher.register(peopleStore.handleActions.bind(peopleStore));

export default peopleStore;
