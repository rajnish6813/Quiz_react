import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Home from "./components/home";
import Quiz from "./components/quiz";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/quiz/:id" component={Quiz} />
        <Redirect to="/home" component={Home} />
      </Switch>
    );

    return routes;
  }
}
export default withRouter(App);
