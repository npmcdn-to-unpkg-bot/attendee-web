import React from "react";

import { IndexLink } from "react-router";
import EventStore from "../stores/EventStore";

var moment = require('moment');

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSubscribed = this.toggleSubscribed.bind(this);
  }

  toggleSubscribed() {
    if(this.props.isSubscribed){
      EventStore.unsubscribeToEvent(this.props.id);
    } else {
      EventStore.subscribeToEvent(this.props.id);
    }
  }

  render() {
    const { id, name, description, stream, streamColor, isSubscribed, location, starttime, endtime } = this.props;

    var streamStyle = {
      borderColor: streamColor
    };

    var dateFormat = "MM-DD h:mm a";

    return (
      <IndexLink to={{ pathname: 'events/' + this.props.id }}>
        <div id={"event-" + id} className="event">
          <div className="time" style={streamStyle}>
            <p className="start">{moment.unix(starttime).format("hh:mma")}</p>
            <p className="end">{moment.unix(endtime).format("hh:mma")}</p>
          </div>
          <div className="details">
            <h4 className="title">{name}</h4>
            <p className="location">{location}</p>
          </div>
          <div class="isSubscribed" onClick={this.toggleSubscribed}> {isSubscribed + ""}</div>
        </div>
      </IndexLink>
    );
  }
}
