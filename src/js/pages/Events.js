import React from "react";

import Event from "../components/Event";
import EventStore from "../stores/EventStore";


export default class Events extends React.Component {
	constructor() {
		super();
		this.getEvents = this.getEvents.bind(this);
		this.state = {
			events: EventStore.getAll()
		}
	}

  componentWillMount() {
    EventStore.on("change", this.getEvents);
  }

  componentWillUnmount() {
    EventStore.removeListener("change", this.getEvents);
  }

	getEvents() {
		this.setState({
			events: EvenStore.getAll()
		})
	}

  render() {
    const { events } = this.state;

    const EventComponents = events.map((event) => {
        return <Event key={event.id} {...event}/>;
    });

    return (
      <div>
        <h1>Events</h1>
        <ul>{EventComponents}</ul>
      </div>
    );
  }
}
