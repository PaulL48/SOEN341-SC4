import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListC} from './components';
import Axios from 'axios';
import {getQuestions} from './api'
import {signOutAction} from './screens';


const mapStateToProps = state =>({
    isLoggedIn: state.auth.isLoggedIn,
    currentUser : state.auth.currentUser
});
const mapDispatchToProps = dispatch =>({
    signOutActionDispatch : () => dispatch(signOutAction()),
});


export class App extends Component {
    constructor(){
        super();
        this.state={
            data:[
                {
                    title: '',
                    author: '',
                    created_at: '',
                    resolved: false  
                },
            ],
        };
    }

    handleAuth(){
        if(this.props.isLoggedIn){
            return(
                [
                    <span key="1"> Hi {this.props.currentUser.user.name} !</span>,
                    <a key="2" onClick={()=>this.handleSignout()}>LogOut</a>,
                ]
            );
        }else{
            return(
                [
                    <a key="1" href="/Login">Login</a>, // they are a tags instead of links, so that the browser will refresh the crsf token!
                    <a key="2" href="/Register">Register</a>
                ]
            );
        }
    }

    handleSignout(){
        this.props.signOutActionDispatch();
    }

    componentWillMount(){
        getQuestions().then((res)=>{
           this.setState({data:res.data});
           console.log(res);
       }).catch(()=>{
        
       });
    }

    render() {
        return (
            <div className="container" >
                    <div className="flex-center position-ref full-height">
                        <div className="top-right links">
                            <Link to="/">SOEN341-SC4</Link>
                            <Link to="/question/ask">Ask a question</Link>
                            {this.handleAuth()}
                        </div>
                    <div className="content">
                        <ListC data={this.state.data}/>
                    </div>
                </div>
            </div>
        );
    }
}

export const AppScreen = connect(mapStateToProps,mapDispatchToProps)(App);




