import dispatcher from "../dispatcher";

export function reloadPeople() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_PEOPLE"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_PEOPLE", people: [
      {
        id: 1,
        name: "Clarisse Schneider",
        organization: "University of Waterloo",
      },
      {
        id: 2,
        name: "Adam Key",
        organization: "Google",
      },
      {
        id: 3,
        name: "Hannah Gorge"
        organization: "McMaster University",
      },
    ]});
  }, 1000);
}
