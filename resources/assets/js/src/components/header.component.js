import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutAction} from '../screens';

const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser : state.auth.currentUser
});
const mapDispatchToProps = dispatch =>({
    signOutActionDispatch : () => dispatch(signOutAction()),
});

export class HeaderComponent extends PureComponent{

    constructor(){
        super();
        this.state ={
            
        };
    }


    handleSignout(){
        this.props.signOutActionDispatch();
    }


    handleAuth(){
        if(this.props.isLoggedIn){
            return(
                [
                    <li key="1" style={{fontSize:18}}><Link to="/question/ask">Ask a question</Link></li>,
                    <li key="2" style={{padding:14, fontSize:18}}>Hi {this.props.currentUser.user.name} ! </li>,
                    <li key="3" style={{fontSize:18}}><a onClick={()=>this.handleSignout()}>Log out</a></li>
                ]
               
            );
        }else{  
            return(
            [
                <li key="1"><a href="/Login">Login</a></li>,
                <li key="2"><a href="/Register">Register</a></li>
            ]
        );
        }
    }
    
    render(){
        return(
            <div id="app">
            <nav className="navbar navbar-default navbar-static-top" style={{marginBottom:10}}>
                <div className="container">
                    <div className="navbar-header" style={{}}>
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