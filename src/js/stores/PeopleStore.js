import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var $ = require("jquery");

class PeopleStore extends EventEmitter {
  constructor() {
    super()
    this.people = [];
    this.error = null;
  }

  getAll() {
    $.ajax({
      url: " https://sehackday.calligre.com/api/user",
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "PEOPLE_GET", people: response});
      },
      failure: function(error){
        dispatcher.dispatch({type: "PEOPLE_ERROR", error: error});
      }
    });
    return this.people;
  }

  handleActions(action) {
    switch(action.type) {
      case "PEOPLE_GET": {
        this.people = action.people;
        this.emit("received");
        break;
      }
      case "PEOPLE_ERROR": {
        this.error = action.error;
        this.emit("error");
        break;
      }
    }
  }
}

const peopleStore = new PeopleStore;
dispatcher.register(peopleStore.handleActions.bind(peopleStore));

export default peopleStore;
