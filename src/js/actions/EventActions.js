import dispatcher from "../dispatcher";

export function refreshEvents() {
  dispatcher.dispatch({
    type: "REFRESH_EVENTS",
  });
}
