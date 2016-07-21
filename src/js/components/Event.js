import React from "react";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { id, name, descriptionm, stream, streamColor, isSubscribed, location, time } = this.props;
    const { start, end } = time;

    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
      <tr id={"event-" + id} class="event-item">
        <td class="stream" style={streamStyle}></td>
        <td class="dates">
          <div class="date">{moment.unix(start).format("h:mm a")}</div>
          <div class="date">{moment.unix(end).format("h:mm a")}</div>
        </td>
        <td class="info">
          <div class="name">{name}</div>
          <div class="location">{location}</div>
        </td>
      </tr>
    );
  }
}
