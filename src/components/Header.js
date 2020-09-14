import React,{Component} from "react";
import {Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem} from "reactstrap"
import {NavLink} from "react-router-dom";
class Header extends Component{
    constructor(){
        super();
        this.state={
            isNavOpen:false,
            isModalOpen:false
        }
        this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    toggleNav(){

        this.setState({
            isNavOpen:!this.state.isNavOpen
        })
    }

    toggleModal(){

        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }
    render(){
        return(
            //React Fragment
            <>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={this.toggleNav}/>
                    <NavbarBrand className="mr-auto" href="#">
                        <img src="assets/images/logo.png" height="30" width="41" alt="logo"></img>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className="nav-link" to="/home">
                                <span className="fa fa-home fa-lg"></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/aboutus">
                                <span className="fa fa-info fa-lg"></span> About Us
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/browse">
                                <span className="fa fa-list fa-lg"></span>Browse
                            </NavLink>
                        </NavItem>
                            <NavItem>
                            <NavLink className="nav-link" to="/search">
                                <span className="fa fa-search fa-lg"></span> Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to="/contactus">
                                <span className="fa fa-address-card fa-lg"></span> Contact Us
                            </NavLink>
                        </NavItem>
                    </Nav>
                    
                    </Collapse>
                </div>
            </Navbar>
            <div className="container">
                <div  style={{textAlign:'center'}}>
                   <centre><h1 style={{color:'white'}}>MoviesBazar</h1></centre> 
                </div>
            </div>

            </>
        )
    }
}
export default Header;