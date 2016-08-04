import React from "react";
var $ = require('jquery');
var _ = require('lodash');

import BroadcastMessage from "../components/BroadcastMessage";

import Events from "../components/Events"
import EventStore from "../stores/EventStore";

export default class Featured extends React.Component {
  constructor(props) {
    super();
    this.state = {
      messages: [],
      events: [],
      apiBaseURL: props.route.apiBaseURL,
    };
  }

  componentDidMount() {
    this.broadcastRequest = $.get(this.state.apiBaseURL + "/broadcast", function (result) {
      this.setState({
        messages: result.data,
      });
    }.bind(this));

    var event_ids = [];
    var evnts = [];
    var self = this;
    this.eventRequest = $.get(this.state.apiBaseURL + "/user/1/subscription", function (result) {
      for (var i in result.data) {
        event_ids.push({'id': result.data[i].attributes.event_id});
      }

      this.eventsRequest = $.get(this.state.apiBaseURL + "/event", function (result) {
        evnts = _.intersectionBy(result.data, event_ids, 'id');
        self.setState({
          events: evnts,
        });
      });

    }.bind(this));
  }

  componentWillUnmount() {
    this.broadcastRequest.abort();
    this.eventRequest.abort();
  }

  render() {
    const { messages, events, apiBaseURL } = this.state;

    const MessageComponents = messages.map((messages) => {
      return <BroadcastMessage key={messages.id} text={messages.attributes.message} {...messages}/>;
    });

    const EventComponents = events.map((events) => {
      return <Events key={events.id} name={events.attributes.name} description={events.attributes.description} starttime={events.attributes.starttime} endtime={events.attributes.endtime} location={events.attributes.location} {...events}/>;
    });

    return (
      <div>
        <div>
          <span>{MessageComponents}</span>
        </div>

        <br/>

        <div>
          <span>{EventComponents}</span>
        </div>
      </div>
    );
  }
}
