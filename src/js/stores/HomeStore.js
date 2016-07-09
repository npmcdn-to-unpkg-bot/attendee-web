import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class HomeStore extends EventEmitter {
  constructor() {
    super()
    this.home = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createHome(text) {
    const id = Date.now();

    this.home.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.home;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_HOME": {
        this.createHome(action.text);
        break;
      }
      case "RECEIVE_HOME": {
        this.home = action.home;
        this.emit("change");
        break;
      }
    }
  }

}

const homeStore = new HomeStore;
dispatcher.register(homeStore.handleActions.bind(homeStore));

export default homeStore;
