import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, IndexLink } from "react-router";

require('!style!css!sass!../sass/main.scss');

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NewsFeed from "./pages/NewsFeed";
import People from "./pages/People";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Info from "./pages/Info";


const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute apiBaseURL="https://dev.calligre.com/api" component={Home}></IndexRoute>
      <Route path="newsfeed" component={NewsFeed}></Route>
      <Route path="people" component={People}></Route>
      <Route path='people/:id' component={Profile} />
      <Route path="events" component={Events}></Route>
      <Route path="profile" component={Profile}></Route>
      <Route path="info" apiBaseURL="https://dev.calligre.com/api" component={Info}></Route>
    </Route>
  </Router>,
app);
