import React from "react";

import Event from "../components/Event";
import EventStore from "../stores/EventStore";
import style from '../../sass/events.scss';

import SearchInput, {createFilter} from 'react-search-input';
import Select from 'react-select';




export default class Events extends React.Component {
	constructor(props) {
		super(props);
		this.getEvents = this.getEvents.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.filterUpdated = this.filterUpdated.bind(this);


		this.state = { events: [], searchTerm: '', filterTerms: this.props.location.query};
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

  searchUpdated (term) {
    this.setState({
      searchTerm: term
    })
  }

  filterUpdated (terms) {
    this.setState({
      filterTerms: terms,
    })
  }

  showError(){
    console.log(EventStore.error)
  }

  render() {
    const { events, searchTerm, filterTerms } = this.state;


    var self = this;
    var filteredEvents = events.filter(createFilter(searchTerm, ['name']));
    filteredEvents = filteredEvents.filter((event) => {
      if(typeof filterTerms['stream'] != 'undefined' && event['stream'] != filterTerms['stream']) return false;

      return true;
    });


    const sortedEvents = filteredEvents.sort((a, b) => {
      if(a.time.start == b.time.start){
        if(a.time.end == b.time.end) {
          return a.name < b.name ? -1 : 1;
        }
        return a.time.end < b.time.end ? -1 : 1;
      }
      return a.time.start < b.time.start ? -1 : 1;
    });

    const EventComponents = sortedEvents.map((event) => {
        return <Event key={event.id} {...event}/>;
    });

    return (
      <div>
        <h1>Events</h1>
        <SearchInput className="Select-control search-input" onChange={this.searchUpdated} placeholder="Search for events"/>
        <div id="events">
          {EventComponents}
        </div>
      </div>
    );
  }
}
