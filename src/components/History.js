import React,{Component} from 'react';
import axios from 'axios';
class History extends Component{
    constructor(){
        super();
        this.state={
            movies:null
        }
        //this.handleHistory=this.handleHistory.bind(this);
    }

componentDidMount(){
axios.get('users/search')
.then(res=>{
    const data=res.data;
    console.log("Componentdidmount")
    console.log(res.data);
    this.setState({movies:res.data});
})
.catch(err=>{
    console.log("ERROR");
})
}


    render(){
        return(
            <center>
                <h2>History</h2>
            <div classname="col-6" style={{backgroundColor:"white",padding:"10px"}}>
                  {(()=>{
                        if(this.state.movies!=null){
                            return(
                                <>
                                {this.state.movies.map((item)=>{
                                    return(<>
                                    <li>{item.movie}</li>
                                    </>)
                                })}
                                </>
                            )
                            
                        }else{
                            return(
                                <marquee><h2>NO SEARCH HISTORY</h2></marquee>
                            )
                        }
                    })()}
                
                
            </div>
            </center>
        )
    }
}
 export default History;