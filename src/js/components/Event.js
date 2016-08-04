import React from "react";

import { IndexLink } from "react-router";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, name, descriptionm, stream, streamColor, isSubscribed, location, time } = this.props;
    const { start, end } = time;

    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
      <IndexLink to={{ pathname: 'events/' + this.props.id }}>
        <div id={"event-" + id} class="event-item">
            <div class="stream" style={streamStyle}></div>
            <div class="dates">
              <div class="date">{moment.unix(start).format("h:mm a")}</div>
              <div class="date">{moment.unix(end).format("h:mm a")}</div>
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
