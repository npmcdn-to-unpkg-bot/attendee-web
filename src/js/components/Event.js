import React from "react";
import { browserHistory } from "history";


var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super();
  }

  navigate() {
    console.log(browserHistory);
  }

  render() {
    const { id, name, descriptionm, stream, streamColor, isSubscribed, location, time } = this.props;
    const { start, end } = time;

    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
      <tr id={"event-" + id} class="event-item" onClick={this.navigate.bind(this)}>
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
