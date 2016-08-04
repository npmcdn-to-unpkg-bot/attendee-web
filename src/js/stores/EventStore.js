import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class EventStore extends EventEmitter {
  constructor() {
    super();

    //TEMP! These messages will come from the server
    this.events = [
      {
        name: "abcd",
        description: "this is a test",
        starttime: 1500000000,
        endtime: 1510000000,
        location: "somewhere"
      },
      {
        name: "efgh",
        description: "only a test",
        starttime: 1490000000,
        endtime: 1500000000,
        location: "somewhere else"
      },
      {
        name: "ijkl",
        description: "I repeat",
        starttime: 1480000000,
        endtime: 1500000000,
        location: "somewhere else's else"
      },
    ];
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
