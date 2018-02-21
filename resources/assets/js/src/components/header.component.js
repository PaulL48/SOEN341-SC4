import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser : state.auth.currentUser
});
const mapDispatchToProps = dispatch =>({
    
});

class HeaderComponent extends PureComponent{

    constructor(){
        super();
        this.state ={
            
        };
    }

    handleAuth(){
        if(this.props.isLoggedIn){
            return(
                <li key="1"><a>Profile</a></li>
            );
        }else{  
            return(
            [
                <li key="1"><a href="Login">Login</a></li>,
                <li key="2"><a href="Register">Register</a></li>
            ]
        );
        }
    }
    
    render(){
        return(
            <div id="app">
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>   
                        <Link className="navbar-brand" to="/">
                            Soen341SC4
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul className="nav navbar-nav">
                            &nbsp;
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {this.handleAuth()}            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        );
    }
}

export const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderComponent);