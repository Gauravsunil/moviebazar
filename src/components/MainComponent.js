import React, { Component } from "react";
import "../App.css";
import ShowMovie from "./ShowMovie.js";
import ShowForm from "./ShowForm.js";
import Header from "./Header.js";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./HomePage.js";
import SearchComponent from "./SearchComponent.js";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class MainComponent extends Component {
  constructor() {
    super();
    this.state = {
      movie: "top_rated",
      items: null,
      search: null,
      searchitems: null,
    };
  }

  callBackFunction = (data) => {
    this.setState({ movie: data.movie, items: data.Items });
  };

  callBackSearch = (data) => {
    this.setState({ search: data.movie, searchitems: data.Items });
  };
  render() {
    const ShowMovieData = () => {
      return (
        <div className="container">
          <ShowForm callBackFunction={this.callBackFunction} />
          <br />
          <br />
          <ShowMovie movie={this.state.movie} items={this.state.items} />
        </div>
      );
    };

    const SearchMovieData = () => {
      return (
        <div className="container">
          <SearchComponent callBackFunction={this.callBackSearch} />
          <ShowMovie movie={this.state.search} items={this.state.searchitems} />
        </div>
      );
    };
    const Home = () => {
      return <HomePage />;
    };

    return (
      <>
        <Header />
        <div>
          <TransitionGroup>
            <CSSTransition classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={Home} />
                <Route exact path="/browse" component={ShowMovieData} />
                <Route exact path="/search" component={SearchMovieData} />
                <Redirect to="home" />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </>
    );
  }

  async componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=f2389eed03b839edeb2178897fa33c6d`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({ items: data.results });
  }
}

export default MainComponent;
