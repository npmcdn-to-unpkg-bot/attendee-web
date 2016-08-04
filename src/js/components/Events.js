import React from "react";

var moment = require('moment');

export default class Events extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { name, description, starttime, endtime, location } = this.props;

    return (
      <div>
        <p>This event: <span>{name}</span> (<span>{description}</span>)</p>
        <p>Is happening: <span>{moment.unix(starttime).toString()}</span> to <span>{moment.unix(endtime).toString()}</span></p>
        <p>at: <span>{location}</span></p>
      </div>
    );
  }
}