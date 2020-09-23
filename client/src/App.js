import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home/Home";
import PostDetails from "./screens/PostDetails/PostDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/posts/:id' component={PostDetails} />
      </Switch>
    </div>
  );
}

export default App;
