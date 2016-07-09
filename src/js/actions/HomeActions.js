import dispatcher from "../dispatcher";

export function createHome(text) {
  dispatcher.dispatch({
    type: "CREATE_HOME",
    text,
  });
}

export function deleteHome(id) {
  dispatcher.dispatch({
    type: "DELETE_HOME",
    id,
  });
}

export function reloadHome() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_HOME"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_HOME", home: [
      {
        id: 8484848484,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6262627272,
        text: "Hug Wife",
        complete: true
      },
    ]});
  }, 1000);
}
