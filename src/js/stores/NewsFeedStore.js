import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var $ = require("jquery");

class NewsFeedStore extends EventEmitter {

  constructor() {
    super()

    this.posts = [];
    this.error = null;
  }


  // constructor() {
  //   super()

  //   this.posts = [
  //     {
  //       id: 113464613,
  //       text: "I'm at a conference!!",
  //       media_link: "http://www.memegasms.com/media/created/vhyfxm.jpg",
  //       like_count: 1,
  //     },
  //     {
  //       id: 235684679,
  //       text: "This blows",
  //     },
  //   ];
  // }


  getAll() {
    $.ajax({
      // url: "https://sehackday.calligre.com/api/content",
      // url: "https://yi7degrws0.execute-api.us-west-2.amazonaws.com/api/content",
      url: "https://dev.calligre.com/api/content",
      dataType: "json",
      cache: false,
      success: function(response){
        dispatcher.dispatch({type: "NEWSFEED_GET", posts: response["items"]});
      },
      failure: function(error){
        dispatcher.dispatch({type: "NEWSFEED_ERROR", error: error});
      }
    });

    return this.posts;
  }

  // TODO grab in segments instead of all at once

  incrementLike() {
    console.log("TODO: incrementLike");
  }

  decrementLike() {
    console.log("TODO: decrementLike");
  }


  createPost(text) {
    const id = Date.now();

    this.posts.push({
      id,
      text,
    });

    this.emit("change");
  }


  handleActions(action) {
    switch(action.type) {
      case "NEWSFEED_POST": {
        this.emit("received");
        break;
      }
      case "NEWSFEED_GET": {
        this.posts = action.posts;
        // TODO: Append posts, don't simply delete old data
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

const newsFeedStore = new NewsFeedStore;
dispatcher.register(newsFeedStore.handleActions.bind(newsFeedStore));

export default newsFeedStore;
