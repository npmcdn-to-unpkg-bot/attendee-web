import React from "react";

var moment = require('moment');
var $ = require('jquery');

import style from '../../sass/teststyle.scss';

export default class Info extends React.Component {
  constructor() {
    super();

    this.state = {
      logo: "/splash",
      confName: "Loading...",
      location: "Loading...",
      startDate: moment().unix(),
      endDate: moment().unix(),
      other: "Loading...",
      twitter: "Loading...",
      facebook: "Loading...",
    };
  }

  componentDidMount() {
    this.serverRequest = $.get(this.props.route.apiBaseURL + "/info", function (result) {
      this.setState({
        logo: result.logo,
        confName: result.name,
        location: result.location,
        starttime: result.starttime,
        endtime: result.endtime,
        other: result.other,
        twitter: result.twitter,
        facebook: result.facebook,
      });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }


  render() {
    const {logo, confName, location, starttime, endtime, other, twitter, facebook} = this.state;
    return (
      <div>
        <img src={logo} />
        <h1>You're at: {confName}</h1>
        <h2> The location is: {location}</h2>
        <h2> It begins: {moment.unix(starttime).toString()}</h2>
        <h2> It ends: {moment.unix(endtime).toString()}</h2>
        <h3> The rest of it is: {other}</h3>
        <a href={twitter}> <img src="https://abs.twimg.com/favicons/favicon.ico" /></a>
        <a href={facebook}> <img src="https://www.facebook.com/rsrc.php/yl/r/H3nktOa7ZMg.ico" /></a>
      </div>
    );
  }
}

