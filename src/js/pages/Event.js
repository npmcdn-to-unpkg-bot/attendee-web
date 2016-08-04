import React from "react";

import EventStore from "../stores/EventStore";
import { IndexLink } from "react-router";


var moment = require('moment');

export default class Events extends React.Component {
	constructor(props) {
		super(props);
		this.getEvent = this.getEvent.bind(this);
    this.toggleSubscribed = this.toggleSubscribed.bind(this);

    this.state = { event: undefined };

    EventStore.get(this.props.params.eventId);
	}

  componentWillMount() {
    EventStore.on("received", this.getEvent);
    EventStore.on("subscription", this.getEvent);
    EventStore.on("error", this.showError);
  }

  componentWillUnmount() {
    EventStore.removeListener("received", this.getEvent);
    EventStore.removeListener("subscription", this.getEvent);
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

  toggleSubscribed() {
    if(this.state.event.isSubscribed){
      EventStore.unsubscribeToEvent(this.state.event.id);
    } else {
      EventStore.subscribeToEvent(this.state.event.id);
    }
  }

  showError(){
    console.log(EventStore.error)
  }

  render() {
    if(typeof this.state.event == "undefined") {
      return (<div></div>);
    }

    const { event } = this.state;
    const { id, name, description, stream, streamColor, isSubscribed, location, starttime, endtime } = event;


    var streamStyle = {
      backgroundColor: streamColor
    };

    return (
        <div>
        <h1>Event {name}</h1>
          <div id={"event-" + id} class="event-item">
            <IndexLink to={{ pathname: 'events?stream=' + stream }}>
              <div class="stream" style={streamStyle}></div>
            </IndexLink>
            <div class="dates">
              <div class="date">{moment.unix(starttime).format("h:mm a")}</div>
              <div class="date">{moment.unix(endtime).format("h:mm a")}</div>
            </div>
            <div class="info">
              <div class="name">{name}</div>
              <div class="description">{description}</div>
              <div class="location">{location}</div>
            </div>
            <div class="isSubscribed"  onClick={this.toggleSubscribed}> Are you subscribed: {isSubscribed + ""}
            </div>
          </div>                
      </div>
    );
  }
}
