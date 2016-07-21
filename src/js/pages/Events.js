import React from "react";

import Event from "../components/Event";
import EventStore from "../stores/EventStore";
import style from '../../sass/events.scss';


export default class Events extends React.Component {
	constructor() {
		super();
		this.getEvents = this.getEvents.bind(this);
		this.state = { events: []};
		EventStore.getAll()
	}

  componentWillMount() {
    EventStore.on("received", this.getEvents);
    EventStore.on("error", this.showError);
  }

  componentWillUnmount() {
    EventStore.removeListener("received", this.getEvents);
    EventStore.removeListener("error", this.showError);
  }

	getEvents() {
		this.setState({
			events: EventStore.events
    });
	}

  showError(){
    console.log(EventStore.error)
  }

  render() {
    const { events } = this.state;

    const EventComponents = events.map((event) => {
        return <Event key={event.id} {...event}/>;
    });

    return (
      <div>
        <h1>Events</h1>
        <table id="events">
          <tbody>
            {EventComponents}
          </tbody>
        </table>
      </div>
    );
  }
}
