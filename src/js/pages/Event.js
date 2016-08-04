import React from "react";

import EventStore from "../stores/EventStore";
import { IndexLink } from "react-router";


var moment = require('moment');

export default class Events extends React.Component {
	constructor(props) {
		super(props);
		this.getEvent = this.getEvent.bind(this);
    this.state = { event: undefined };

    EventStore.get(this.props.params.eventId);
	}

  componentWillMount() {
    EventStore.on("received", this.getEvent);
    EventStore.on("error", this.showError);
  }

  componentWillUnmount() {
    EventStore.removeListener("received", this.getEvent);
    EventStore.removeListener("error", this.showError);
  }

	getEvent() {
    var id = this.props.params.eventId;
    var event = EventStore.events.filter((event) => {
      return event.id == id;
    })[0]
    this.setState({
      event: event
    })
	}

  showError(){
    console.log(EventStore.error)
  }

  render() {
    if(typeof this.state.event == "undefined") {
      return (<div></div>);
    }

    const { event } = this.state;
    const { id, name, description, stream, streamColor, isSubscribed, location, time } = event;


    const { start, end } = time;

    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
        <div>
        <h1>Event {name}</h1>
          <IndexLink to={{ pathname: 'events?stream=' + stream }}>
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
      </div>
    );
  }
}
