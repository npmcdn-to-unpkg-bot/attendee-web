import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class NewsFeedStore extends EventEmitter {

  constructor() {
    super()

    this.posts = [
      {
        id: 113464613,
        text: "I'm at a conference!!",
      },
      {
        id: 235684679,
        text: "This blows",
      },
    ];
  }

  createPost(text) {
    const id = Date.now();

    this.posts.push({
      id,
      text,
    });

    this.emit("change");
  }

  getAll() {
    return this.posts;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POST": {
        this.posts = action.posts;
        this.emit("change");
        break;
      }
      case "RETRIEVE_FEED": {
        this.retrieveFeed(action.text);
        break;
      }

    }
  }
}

const newsFeedStore = new NewsFeedStore;
dispatcher.register(newsFeedStore.handleActions.bind(newsFeedStore));

export default newsFeedStore;
