import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class EventStore extends EventEmitter {
  constructor() {
    super()
    this.events = [
      {
        id: 113464613,
        name: "Event Creation",
        description: "This a gathering of developers working to create dummy data for displaying events",
        stream: 7,
        isSubscribed: true,
        location: "That one place",
        time: {
          start: 1451606400000,
          end: 1451610000000
        }
      },{
        id: 113464614,
        name: "Event Creation pt 2",
        description: "This the second gathering of developers working to create dummy data for displaying events",
        stream: 7,
        isSubscribed: false,
        location: "That other place",
        time: {
          start: 1451620800000,
          end: 1451624400000
        }
      },{
        id: 213464614,
        name: 12,
        description: "'Cause who doesn't like cats",
        stream: "HAPPINESS",
        isSubscribed: true,
        location: "Paradise",
        time: {
          start: 1451671200000,
          end: 1451678400000
        }
      }
    ];
  }

  getAll() {
    return this.events;
  }

}

const eventStore = new EventStore;

export default eventStore;
