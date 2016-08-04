import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class EventStore extends EventEmitter {
  constructor() {
    super();

    //TEMP! These messages will come from the server
    this.events = [{
      "id": 113464613,
      "name": "Event Creation",
      "description": "This a gathering of developers working to create dummy data for displaying events",
      "stream": 7,
      "isSubscribed": true,
      "location": "That one place",
      "time": {
        "start": 1470300811,
        "end": 1470300911
      }
    },
    {
      "id": 2,
      "name": "Test Event 2",
      "description": "This a gathering of developers working to create dummy data for displaying events",
      "stream": 7,
      "isSubscribed": false,
      "location": "That other place",
      "time": {
        "start": 1470400811,
        "end": 1470450811
      }
    },
    {
      "id": 4,
      "name": "Test Event 3",
      "description": "This a gathering of developers working to create dummy data for displaying events",
      "stream": 42,
      "isSubscribed": false,
      "location": "That other other place",
      "time": {
        "start": 1480400811,
        "end": 1490400811
      }
    }]
  }

  getEvents()
  {
    //TEMP! Will return events them from the server
    return this.events;

  }

  manageEvents(action) {
    switch(action.type) {
      case "REFRESH_EVENTS": {
        this.getEvents();
        break;
      }
    }
  }
}

const eventStore = new EventStore;
dispatcher.register(eventStore.manageEvents.bind(eventStore));

export default eventStore;
