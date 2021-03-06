import React, { Component } from "react";
import "./ShowMoviestyle.css";
import { Modal, ModalBody } from "reactstrap";
import { FadeTransform } from "react-animation-components";

class ShowMovie extends Component {
  constructor() {
    super();
    this.state = {
      movieinfo: null,
      modal: false,
      smallmodal: false,
      song: null,
      image: null,
      video: null,
      similar: null,
      cast: null,
      torrents: null,
    };
    this.toggle = this.toggle.bind(this);
    this.togglesmall = this.togglesmall.bind(this);
  }

  async MovieInfo(item, name, title) {
    const url = `  https://api.themoviedb.org/3/movie/${item}?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US`;
    const url1 = `https://api.themoviedb.org/3/movie/${item}/similar?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US&page=1`;
    const url2 = `https://api.themoviedb.org/3/movie/${item}/credits?api_key=f2389eed03b839edeb2178897fa33c6d`;
    const url3 = ` https://yts.mx/api/v2/list_movies.json?query_term=${title}`;
    const res = await fetch(url);
    const res1 = await fetch(url1);
    const res3 = await fetch(url2);
    const res4 = await fetch(url3);
    const data = await res.json();
    const data1 = await res1.json();
    const data3 = await res3.json();
    const data4 = await res4.json();
    console.log(data4);
    this.setState({
      movieinfo: data,
      image: name,
      similar: data1.results,
      cast: data3.cast,
      torrents: data4.data,
    });
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  togglesmall() {
    this.setState({ smallmodal: !this.state.smallmodal });
  }
  async VideoInfo(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    this.setState({
      smallmodal: !this.state.smallmodal,
      video: data,
      modal: !this.state.modal,
    });
  }
  render() {
    if (this.props.items === null) {
      return (
        <div>
          <marquee>
            <h2>Search Here</h2>
          </marquee>
        </div>
      );
    } else {
      return (
        <>
          <div>
            <center>
              <h2 className="heading"> {this.props.movie}</h2>
            </center>
          </div>
          <div className="container">
            <FadeTransform
              in
              transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
            >
              <div className="row">
                {this.props.items.map((item, i) => {
                  console.log(this.props.items);
                  if (item.poster_path != null) {
                    var name =
                      "https://image.tmdb.org/t/p/w200/" + item.poster_path;
                    return (
                      <div
                        id={item.id}
                        key={i}
                        className="col-6 col-md-3 block1"
                        onClick={this.MovieInfo.bind(
                          this,
                          item.id,
                          name,
                          item.original_title
                        )}
                      >
                        <img
                          src={name}
                          style={{ width: "90%", height: "100%" }}
                          onClick={this.toggle}
                          alt="Images"
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </FadeTransform>
          </div>
          <Modal
            size="lg"
            className={this.props.className}
            toggle={this.toggle}
            isOpen={this.state.modal}
            style={{ height: "400px" }}
          >
            <ModalBody style={{ backgroundColor: "#222222", color: "white" }}>
              <div style={{ float: "right" }}>
                <span
                  className="fa fa-remove cross"
                  onClick={this.toggle}
                ></span>
              </div>

              {(() => {
                if (this.state.movieinfo != null) {
                  //var name="https://image.tmdb.org/t/p/w200/"+this.state.movieinfo.backdrop_path;

                  return (
                    <>
                      <FadeTransform
                        in
                        transformProps={{
                          exitTransform: "scale(0.5) translateY(-50%)",
                        }}
                      >
                        <center>
                          <div className="col-6  block1">
                            <img
                              src={this.state.image}
                              style={{ width: "90%", height: "100%" }}
                              alt="Images"
                            />
                          </div>
                          <h3>{this.state.movieinfo.title}</h3>
                          <br></br>
                          <h4>Watch Trailer</h4>
                          <button
                            onClick={this.VideoInfo.bind(
                              this,
                              this.state.movieinfo.id
                            )}
                            className="btn btn-danger"
                          >
                            <span className="fa fa-play-circle"></span>
                          </button>
                        </center>
                        <br></br>
                        <div className="container">
                          <div className="row">
                            <div className="col-3">
                              <h4>Release Date</h4>
                            </div>
                            <div className="col-6">
                              <h5 style={{ color: "green" }}>
                                :{this.state.movieinfo.release_date}
                              </h5>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-3">
                              <h4>Genres</h4>
                            </div>
                            <div className="col-6">
                              <h5 style={{ color: "#4B52AE" }}>
                                :{this.state.movieinfo.genres[0].name}
                              </h5>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3">
                              <h4>Rating</h4>
                            </div>
                            <div className="col-6">
                              <h5 style={{ color: "gold" }}>
                                :{this.state.movieinfo.vote_average}
                              </h5>
                            </div>
                          </div>
                          {(() => {
                            if (this.state.torrents.movies !== undefined) {
                              return (
                                <div className="row">
                                  <div
                                    className="col-3"
                                    style={{ marginRight: "5px;" }}
                                  >
                                    <h4>Torrent Download</h4>
                                  </div>
                                  {this.state.torrents.movies[0].torrents.map(
                                    (item, i) => {
                                      if (i <= 1) {
                                        return (
                                          <div className="col-3">
                                            <a href={item.url}>
                                              <button className="btn btn-success">
                                                {item.quality}
                                              </button>
                                            </a>
                                          </div>
                                        );
                                      }
                                    }
                                  )}
                                </div>
                              );
                            }
                          })()}

                          <div className="row">
                            <div className="col-3">
                              <h4>Star Cast</h4>
                            </div>
                            <div className="col-9">
                              <div className="row2" style={{ display: "flex" }}>
                                {this.state.cast.map((item) => {
                                  if (item.profile_path != null) {
                                    var name =
                                      "https://image.tmdb.org/t/p/w200/" +
                                      item.profile_path;
                                    return (
                                      <>
                                        <div className="block3" key={item.id}>
                                          <img src={name} alt="Images" />
                                          <h6>{item.name}</h6>
                                        </div>
                                      </>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="container">
                          <div className="row" style={{ marginTop: "20px" }}>
                            <center>
                              <div className="col-10">
                                <p>{this.state.movieinfo.overview}</p>
                              </div>
                            </center>
                          </div>
                        </div>
                        {(() => {
                          if (this.state.similar.length > 0) {
                            return (
                              <div className="container">
                                <center>
                                  <h2>Similar Movies</h2>
                                </center>
                                <div
                                  className="row3"
                                  style={{ display: "flex" }}
                                >
                                  {this.state.similar.map((item) => {
                                    var name =
                                      "https://image.tmdb.org/t/p/w200/" +
                                      item.poster_path;
                                    return (
                                      <>
                                        <div
                                          className="block4"
                                          key={item.id}
                                          onClick={this.MovieInfo.bind(
                                            this,
                                            item.id,
                                            name
                                          )}
                                        >
                                          <img src={name} alt="Images" />
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </FadeTransform>
                    </>
                  );
                } else {
                  return <h2>Loading....</h2>;
                }
              })()}
            </ModalBody>
          </Modal>

          <Modal
            size="lg"
            isOpen={this.state.smallmodal}
            toggle={this.togglesmall}
            className={this.props.className}
          >
            {(() => {
              if (this.state.video != null) {
                var name =
                  "https://youtube.com/embed/" +
                  this.state.video.results[0].key;
                return (
                  <div style={{ height: "500px", width: "100%" }}>
                    <iframe
                      id="inlineFrameExample"
                      title="Inline Frame Example"
                      width="100%"
                      height="100%"
                      src={name}
                    ></iframe>
                  </div>
                );
              } else {
                return <h2>NO TRAILER</h2>;
              }
            })()}
          </Modal>
        </>
      );
    }
  }
}
export default ShowMovie;
// API key 	e561b760beda0989eef6dc54f83a8492
// Shared secret 	15e927397766eb4f6deb4cd4eb4ec192
