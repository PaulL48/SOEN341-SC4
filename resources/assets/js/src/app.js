import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Input} from 'antd';
import {ListC} from './components';
import Axios from 'axios';
import {getQuestions} from './api';
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
            results: [
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
           this.setState({data:res.data,results:res.data});
           console.log(res);
       }).catch(()=>{
        
       });
    }

    handleSearchQuestions(input){
        let searchDataArray = [];
        
        this.state.data.map((currentItem)=>{
            
            if(currentItem.title.toLowerCase().indexOf(input.target.value.toString().toLowerCase()) != -1){
                searchDataArray.push(currentItem);
            }
        });
        this.setState({
            results: searchDataArray
        });
    }

    render() {
        return (
            <div className="container" >
                    <div className="flex-center position-ref full-height">
                        <div className="top-right links">
                            <Link className="homepage" to="/" style={{fontWeight:"bold",fontStyle:"oblique",fontSize:18}}>SOEN341SC4</Link>
                            <Input.Search
                            placeholder="Search here ..."
                            onChange={value => this.handleSearchQuestions(value)}
                            style={{ width: 200 }}
                            />
                            <Link to="/question/ask">Ask a question</Link>
                            {this.handleAuth()}
                        </div>
                        
                    <div className="content">
                            <span style={{fontWeight:"bold",fontSize:60,display:"flex",justifyContent:"center",textAlign:"center"}}>Welcome to SOEN341-SC4!</span>
                            <div>
                                <div className="DisplayRecentQuestion">
                                    <span>Below are the Questions!</span>
                                    <span></span>
                                </div>
                            </div>
                        <ListC data={this.state.results}/>
                    </div>
                </div>
            </div>
        );
    }
}

export const AppScreen = connect(mapStateToProps,mapDispatchToProps)(App);