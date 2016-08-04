import dispatcher from "../dispatcher";

export function createBroadcast(text, end) {
  dispatcher.dispatch({
    type: "CREATE_BROADCAST",
    text,
    end,
  });
}

export function refreshBroadcast() {
  dispatcher.dispatch({
    type: "REFRESH_BROADCAST",
  });
}

// export function reloadHome() {
//   // axios("http://someurl.com/somedataendpoint").then((data) => {
//   //   console.log("got the data!", data);
//   // })
//   dispatcher.dispatch({type: "FETCH_HOME"});
//   setTimeout(() => {
//     dispatcher.dispatch({type: "RECEIVE_HOME", home: [
//       {
//         id: 8484848484,
//         text: "Go Shopping Again",
//         complete: false
//       },
//       {
//         id: 6262627272,
//         text: "Hug Wife",
//         complete: true
//       },
//     ]});
//   }, 1000);
// }
