import './App.css';
import React from "react"
import {BrowserRouter, Route} from "react-router-dom";
import PostList from "../pages/PostList";
import Login from "../pages/Login"
import Header from "../components/Header"
import { Grid } from '../elements';
import Signup from '../pages/Signup';

function App() {
  return (
    <React.Fragment>
      <Grid>
      <Header></Header>
      <BrowserRouter>
      <Route path="/" exact component={PostList}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
