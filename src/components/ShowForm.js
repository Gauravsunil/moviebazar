import React, { Component } from 'react';

class ShowForm extends Component{
    constructor(props){
        super(props);
        this.state={
            movie:'top_rated',
            Items:null
        }
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        this.setState({movie: event.target.value});
      }

      async onFormSubmitted(e) {
        e.preventDefault();
        const url=`https://api.themoviedb.org/3/movie/${this.state.movie}?api_key=f2389eed03b839edeb2178897fa33c6d`;
        const res = await fetch(url);
        const data = await res.json();
        this.setState({Items:data.results});
        this.props.callBackFunction(this.state);
       
      }
    render(){
        return(
            <div className="container">
          <form  onSubmit={this.onFormSubmitted.bind(this)}>
          <div className="row">
            <div className="col-5 offset-3">
              <select name="countrySelecter"  value={this.state.value} onChange={this.handleChange} className="custom-select">
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
              </select>
            </div>
            <div className="col-2">
              <button name="submitbutton" type="submit" className="btn btn-primary">Browse</button>
            </div>
          </div>
        </form>
            </div>
        );
    }
}

export default ShowForm;