import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class BroadcastStore extends EventEmitter {
  constructor() {
    super();

    //TEMP! These messages will come from the server
    this.messages = [
      {
        id: 113464613,
        message: "Test message 1",
        timeUp: 1510000000,
      },
      {
        id: 235684679,
        message: "Message test 2",
        timeUp: 1500000000,
      },
      {
        id: 456789012,
        message: "3 message test",
        timeUp: 1520000000,
      },
    ];
  }

  createBroadcast(text, end) {
    //TEMP! This message will get pushed to the server and will return an id
    id = -1;
    this.messages.push(
    {
      id,
      text,
      end,
    });

    this.emit("newBroadcast")
  }

  getBroadcasts()
  {
    //TEMP! Will return messages from the server
    return this.messages;
  }

  manageEvents(action) {
    switch(action.type) {
      case "CREATE_BROADCAST": {
        this.createBroadcast(action.text, action.end);
        break;
      }
      case "REFRESH_BROADCAST": {
        this.getBroadcasts();
        break;
      }
    }
  }
}

const broadcastStore = new BroadcastStore;
dispatcher.register(broadcastStore.manageEvents.bind(broadcastStore));

export default broadcastStore;
