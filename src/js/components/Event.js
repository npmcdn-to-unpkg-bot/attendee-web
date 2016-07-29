import React from "react";

import { IndexLink } from "react-router";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate() {
    //TODO: navigate properly
  }

  render() {
    const { id, name, descriptionm, stream, streamColor, isSubscribed, location, time } = this.props;
    const { start, end } = time;

    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
      <IndexLink to={{ pathname: 'events/' + this.props.eventID }}>
        <div id={"event-" + id} class="event-item" onClick={this.navigate.bind(this)}>
            <div class="stream" style={streamStyle}></div>
            <div class="dates">
              <div class="date">{moment.unix(start).format("h:mm a")}</div>
              <div class="date">{moment.unix(end).format("h:mm a")}</div>
            </div>
            <div class="info">
              <div class="name">{name}</div>
              <div class="location">{location}</div>
            </div>
        </div>                
      </IndexLink>
    );
  }
}
