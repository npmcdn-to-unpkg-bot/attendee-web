import React from "react";
import { browserHistory } from "history";


export default class NewsFeedPost extends React.Component {

  constructor(props) {
    super();
    this.togglePictureDisplay = this.togglePictureDisplay.bind(this);
    this.state = { showPicture: false };
  }

  togglePictureDisplay() {
    this.setState({
      showPicture: !this.state.showPicture
    });
  }

  render() {
    const { id, posterid, text, like_count, media_link, timestamp } = this.props;

    let renderPicture;
    console.log(this.props.media_link);
    if (this.props.media_link == undefined) {
      renderPicture = (
        <div>FAIL</div>
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
          HERE is a test post
        </div>
        {renderPicture}
      </div>
    );
  }
}