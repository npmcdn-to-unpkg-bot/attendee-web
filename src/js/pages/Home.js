import React from "react";

import BroadcastMessage from "../components/BroadcastMessage";
import * as BroadcastActions from "../actions/BroadcastActions";
import BroadcastStore from "../stores/BroadcastStore";

import Events from "../components/Events"
import * as EventActions from "../actions/EventActions.js";
import EventStore from "../stores/EventStore";

export default class Featured extends React.Component {
  constructor() {
    super();
    this.getHome = this.getHome.bind(this);
    this.state = {
      messages: BroadcastStore.getBroadcasts(),
      events: EventStore.getEvents(),
    };
  }

  componentWillMount() {
    BroadcastStore.on("change", this.getHome);
    EventStore.on("change", this.getHome);
  }

  componentWillUnmount() {
    BroadcastStore.removeListener("change", this.getHome);
    EventStore.removeListener("change", this.getHome);
  }

  getHome() {
    this.setState({
      messages: BroadcastStore.getBroadcasts(),
      events: EventStore.getEvents(),
    });
  }

  reloadHome() {
    BroadcastActions.refreshBroadcast();
  }

  render() {
    const { messages, events } = this.state;

    const MessageComponents = messages.map((messages) => {
      return <BroadcastMessage key={messages.id} text={messages.message} {...messages}/>;
    });

    const EventComponents = events.map((events) => {
      return <Events key={events.name} name={events.name} description={events.description} starttime={events.starttime} endtime={events.endtime} location={events.location} {...events}/>;
    });

    return (
      <div>
        <div>
          <span>{MessageComponents}</span>
        </div>
        <div>
          <span>{EventComponents}</span>
        </div>
      </div>
    );
  }
}
