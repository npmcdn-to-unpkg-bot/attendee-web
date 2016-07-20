import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var $ = require("jquery");

class EventStore extends EventEmitter {
  constructor() {
    super()
    this.events = [];
    this.error = null;
  }

  getAll() {
    $.ajax({
      url: " https://sehackday.calligre.com/api/event",
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "EVENTS_GET", events: response});
      },
      failure: function(error){
        dispatcher.dispatch({type: "EVENTS_ERROR", error: error});
      }
    });
    return this.events;
  }

  handleActions(action) {
    switch(action.type) {
      case "EVENTS_GET": {
        this.events = action.events;
        this.emit("received");
        break;
      }
      case "EVENTS_ERROR":
        this.error = action.error;
        this.emit("error");
        break;
    }
  }

}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;
