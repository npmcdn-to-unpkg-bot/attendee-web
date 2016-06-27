import React from "react";

import Home from "../components/Home";
import * as HomeActions from "../actions/HomeActions";
import HomeStore from "../stores/HomeStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getHome = this.getHome.bind(this);
    this.state = {
      home: HomeStore.getAll(),
    };
  }

  componentWillMount() {
    HomeStore.on("change", this.getHome);
  }

  componentWillUnmount() {
    HomeStore.removeListener("change", this.getHome);
  }

  getHome() {
    this.setState({
      home: HomeStore.getAll(),
    });
  }

  reloadHome() {
    HomeActions.reloadHome();
  }

  render() {
    const { home } = this.state;

    const HomeComponents = home.map((home) => {
        return <Home key={home.id} {...home}/>;
    });

    return (
      <div>
        <button onClick={this.reloadHome.bind(this)}>Reload!</button>
        <h1>Home</h1>
        <ul>{HomeComponents}</ul>
      </div>
    );
  }
}
