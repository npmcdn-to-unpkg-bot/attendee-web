import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var $ = require("jquery");
var randomColor = require('randomcolor');
var streamMap = {};


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

  get(id){
    $.ajax({
      url: " https://sehackday.calligre.com/api/event",
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "EVENT_GET", event: response});
      },
      failure: function(error){
        dispatcher.dispatch({type: "ERROR", error: error});
      }
    });
    return this.events;
  }

  handleActions(action) {
    switch(action.type) {
      case "EVENTS_GET": {
        action.events.forEach((event) => {
          if(typeof streamMap[event.stream] == "undefined"){
            streamMap[event.stream] = randomColor();
          }
        });

        this.events = action.events.map((event) => {
          event["streamColor"] = streamMap[event.stream];
          return event;
        })

        this.emit("received");
        break;
      }
      case "EVENT_GET": {
        this.events.forEach((event) => {
          if(event.id == action.event.id) {
            $.extend(event, data);
          }
        });
        this.emit("received");
        break;
      }
      case "ERROR": {
        this.error = action.error;
        this.emit("error");
        break;
      }
    }
  }

}

const eventStore = new EventStore;
dispatcher.register(eventStore.handleActions.bind(eventStore));

export default eventStore;
