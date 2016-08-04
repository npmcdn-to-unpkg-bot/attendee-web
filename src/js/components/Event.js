import React from "react";

import { IndexLink } from "react-router";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, description, stream, streamColor, isSubscribed, location, starttime, endtime } = this.props;

    var streamStyle = {
      backgroundColor: streamColor
    };

    var dateFormat = "MM-DD h:mm a";

    return (
      <IndexLink to={{ pathname: 'events/' + this.props.id }}>
        <div id={"event-" + id} class="event-item">
            <div class="stream" style={streamStyle}></div>
            <div class="dates">
              <div class="date">{moment.unix(starttime).format(dateFormat)}</div>
              <div class="date">{moment.unix(endtime).format(dateFormat)}</div>
            </div>
            <div class="info">
              <div class="name">{name}</div>
              <div class="location">{location}</div>
            </div>
            <div class="subscribed">
              <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
        </div>                
      </IndexLink>
    );
  }
}
