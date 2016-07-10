import React from "react";

var moment = require('moment');

export default class Info extends React.Component {
  constructor() {
      super();
      //Make an API call to /info and then set state
      this.state = {
        logo: "http://se.hackday.ca/assets/logo-white-0b4035ad70a69a2ffe9f254c53d11b16.png",
        conf: "SE Hackday",
        address: "Multimedia lab",
        dateStart: moment().unix(),
        dateEnd: moment().add(1, 'days').unix(),
        other: "More shit.",
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
      }
  }

    changeConf(e) {
        this.setState({conf: e.target.value});
    }

  render() {
    const {logo, conf, address, dateStart, dateEnd, other, twitter, facebook} = this.state;
    return (
      <div>
        <img src={logo} />
        <h1>You're at: {conf}</h1>
        <h2> The address is: {address}</h2>
        <h2> It begins: {moment.unix(dateStart).toString()}</h2>
        <h2> It ends: {moment.unix(dateEnd).toString()}</h2>
        <h3> The rest of it is: {other}</h3>
        <a href={twitter}> <img src="https://abs.twimg.com/favicons/favicon.ico" /> </a>
        <a href={facebook}> <img src="https://www.facebook.com/rsrc.php/yl/r/H3nktOa7ZMg.ico" /> </a>
      </div>
    );
  }
}
