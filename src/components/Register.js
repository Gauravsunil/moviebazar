import React from 'react';
import {register} from './UserFunctions';
import {Button,Form, FormGroup, Input} from "reactstrap"
import {withRouter} from "react-router-dom";

class Register extends React.Component{
    constructor(){
        super()
        this.state={
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        const user={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email:this.state.email,
            password:this.state.password
        }
        register(user).then(res=>{            
                     alert("Registration Succesfull!")
                          this.props.history.push('/home');
             })
    }

    render(){
        return(
            <>
            <center>
            <div className="col-6" style={{padding:"15px",backgroundColor:"white"}}>
                <h2>Registration</h2>
                <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input type="text" id="first_name" name="first_name"
                                    value={this.state.first_name}
                                    placeholder="First Name"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                
                                <Input type="text" id="last_name" name="last_name"
                                    value={this.state.last_name}
                                    placeholder="Last Name"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="email" id="email" name="email"
                                    value={this.state.email}
                                    placeholder="Enter Email"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" id="password" name="password"
                                      value={this.state.password}
                                      placeholder="Password"
                                      onChange={this.onChange}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    
                
            </div>
            </center>
            </>
        )
    }
}
export default withRouter(Register);