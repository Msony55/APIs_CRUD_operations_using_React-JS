import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import ViewUser from "./components/users/ViewUser";
function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/users/:id" component={ViewUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
