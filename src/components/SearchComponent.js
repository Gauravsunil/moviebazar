import React, { Component } from 'react';
class SearchComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            movie:'',
            Items:null
        }
        this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
        this.setState({movie: event.target.value});
      }

      async onFormSubmitted(e) {
        e.preventDefault();
        const url=` https://api.themoviedb.org/3/search/movie?api_key=f2389eed03b839edeb2178897fa33c6d&language=en-US&query=${this.state.movie}&page=1&include_adult=false`;
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
          <div className="col-5 offset-2">
              <input type="text"
              placeholder="Search"
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"></input>
              </div>
              <div className="col-2">
                  <button type="submit" className="btn btn-primary"><span className="fa fa-search"></span></button>
          </div>
          
          </div>
        </form>
            </div>
        );
    }
}

export default SearchComponent;