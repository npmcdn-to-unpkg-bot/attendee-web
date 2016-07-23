import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NewsFeed from "./pages/NewsFeed";
import People from "./pages/People";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Info from "./pages/Info";

import style from '../sass/teststyle.scss';


const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="newsfeed" component={NewsFeed}></Route>
      <Route path="people" component={People}></Route>
      <Route path="events" component={Events}></Route>
      <Route path="profile" component={Profile}></Route>
      <Route path="calendar" component={Calendar}></Route>
      <Route path="info" apiBaseURL="https://sehackday.calligre.com/api" component={Info}></Route>
    </Route>
  </Router>,
app);
