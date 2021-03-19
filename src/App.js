import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { createContext, useState } from 'react';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
      <Header></Header>
      <p>Name: { loggedInUser.name }</p>
        <Switch>
            <Route path="/header">
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/about">

            </Route>

            <PrivateRoute  path="/destination">
              <Destination></Destination>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

          <Route exact path="/">
              <Home></Home>
            </Route>
         
          <Route path="*">
              <h1 className="mt-5 text-center text-danger">404 Error!</h1>
            </Route>

          </Switch>
      </Router>
     
    </UserContext.Provider>
  );
}

export default App;
