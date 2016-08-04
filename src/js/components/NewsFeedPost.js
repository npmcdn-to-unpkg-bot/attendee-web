import React from "react";
import { browserHistory } from "history";


export default class NewsFeedPost extends React.Component {
  constructor(props) {
    super();
    this.showPicture = false;
  }

  togglePictureDisplay() {
    this.showPicture = !this.showPicture;
  }



  render() {
    const { id, posterid, text, like_count, media_link, timestamp } = this.props;

    let renderPicture;

    if (!this.media_link) {
      renderPicture = (
        <div></div>
      );
    } else if (!this.showPicture) {
      renderPicture = (
        <div class="picture-text" onclick={togglePictureDisplay}>Show Photo</div>
      );
    } else {
      renderPicture = (
        <div class="picture" onclick={togglePictureDisplay}>
          <img src={media_link} width="100" height="100"/>
        </div>
      );
    }


    return (
      <div class="newsfeed-post">
        <div class="test-post">
          HERE is a test post
        </div>
        {renderPicture}
      </div>
    );
  }
}