import React from "react";

import NewsFeedStore from "../stores/NewsFeedStore";

export default class NewsFeedPost extends React.Component {

  constructor() {
    super();
    this.togglePictureDisplay = this.togglePictureDisplay.bind(this);
    this.changeLike = this.changeLike.bind(this);
    this.state = {
      showPicture: false,
      liked: 0,
      likeStyle: {color: 'black'},
    };
  }

  // componentWillMount() {
  //   NewsFeedStore.on("updated", this.getNewsFeedPosts); // TODO
  //   NewsFeedStore.on("error", this.showError);
  // }

  // componentWillUnmount() {
  //   NewsFeedStore.removeListener("updated", this.getNewsFeedPosts);
  //   NewsFeedStore.removeListener("error", this.showError);
  // }

  showError(){
    console.log(NewsFeedStoreStore.error);
  }

  togglePictureDisplay() {
    this.setState({
      showPicture: !this.state.showPicture
    });
  }

  changeLike() {
    // TODO: How are we doing this on the backend?
    if (this.state.liked) {
      // When this works, remove liked attribute
      NewsFeedStore.decrementLike();
      this.setState({
        liked: 0,
        likeStyle: {color: 'black'},
      });
    } else {
      NewsFeedStore.incrementLike();
      this.setState({
        liked: 1,
        likeStyle: {color: 'red'},
      })
    }

  }

  render() {

    const { id, posterid, text, like_count, media_link, timestamp } = this.props;

    // TODO: This is a dirty hack job until the API has a solution
    let likeCount = like_count + this.state.liked;

    let renderPicture;
    if (this.props.media_link == undefined) {
      renderPicture = (
        <div>NO MEDIA LINK</div>
      );
    } else if (!this.state.showPicture) {
      renderPicture = (
        <div class="picture-text" onClick={this.togglePictureDisplay}>Show Photo...</div>
      );
    } else {
      renderPicture = (
        <div class="picture" onClick={this.togglePictureDisplay}>
          <img src={media_link}/>
        </div>
      );
    }

    return (
      <div class="newsfeed-post">
        <div class="test-post">
          <div class="username">{posterid}</div>
          <span class="text">{text} </span>
          <div>
            <span class="likes" style={this.state.likeStyle} onClick={this.changeLike}>&hearts;</span>
            <span>{likeCount}</span>
          </div>
        </div>
        {renderPicture}
      </div>
    );
  }
}
