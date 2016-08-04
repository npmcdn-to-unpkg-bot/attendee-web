import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var $ = require("jquery");
var randomColor = require('randomcolor');
var streamMap = {};
var url = "https://dev.calligre.com"

class EventStore extends EventEmitter {
  constructor() {
    super()
    this.events = [];
    this.error = null;
  }

  getAll() {
    $.ajax({
      url: url + "/api/event",
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "EVENTS_GET", events: response.data});
      },
      failure: function(error){
        dispatcher.dispatch({type: "EVENTS_ERROR", error: error.error});
      }
    });
    return this.events;
  }

  get(id){
    $.ajax({
      url: url + "/api/event/" + id,
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "EVENT_GET", event: response.data});
      },
      failure: function(error){
        dispatcher.dispatch({type: "ERROR", error: error.error});
      }
    });
    return this.events;
  }

  handleActions(action) {
    switch(action.type) {
      case "EVENTS_GET": {
        action.events.forEach((event) => {
          if(typeof streamMap[event.attributes.stream] == "undefined"){
            streamMap[event.attributes.stream] = randomColor();
          }
        });

        this.events = action.events.map((event) => {
          var attributes = event.attributes;
          attributes["streamColor"] = streamMap[attributes.stream];
          return attributes;
        })

        this.emit("received");
        break;
      }
      case "EVENT_GET": {
        this.events.forEach((event) => {
          if(event.id == action.event.id) {
            $.extend(event, action.event.attributes);
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
