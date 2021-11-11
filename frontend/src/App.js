import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import InterviewList from "./Components/interviewListPage";
import HomePage from "./Components/homePage";
import EditPage from "./Components/editPage";
import "./App.css";
import ViewSchedule from "./Components/viewSchedulePage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/view-schedule" component={InterviewList} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/edit-interview" component={EditPage} />
          <Route exact path="/view/:id/:email" component={ViewSchedule} />
        </Switch>
      </div>
    );
  }
}

export default App;
