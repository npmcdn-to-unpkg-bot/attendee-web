import React from "react";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, name, descriptionm, stream, isSubscribed, location, time } = this.props;
    const { start, end } = time;

    return (
      <div id={"event-" + id} class="event-item">
        <span class="stream"></span>
        <span>
          <div class="date">{moment.unix(start).format("h:mm a")}</div>
          <div class="date">{moment.unix(end).format("h:mm a")}</div>
        </span>
        <span>
          <div class="name">{name}</div>
          <div class="location">{location}</div>
        </span>
      </div>
    );
  }
}
