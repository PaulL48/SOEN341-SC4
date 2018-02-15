import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Voting,ListC} from './components';
import {Button,Icon} from 'antd';
import Axios from 'axios';



export default class App extends Component {
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
            ]
        };
    }

    componentWillMount(){
       Axios.get('/questions').then((res)=>{
           this.setState({data:res.data});
       }).catch((err)=>{
            console.log(err);
       });
    }
    render() {
        return (
            <div className="container" >
                    <div className="flex-center position-ref full-height">
                        <div className="top-right links">
                            <Link to="/">SOEN341-SC4</Link>
                            <a href="login">Login</a>
                            <a href="register">Register</a>
                            <a href="question/ask">Ask a question</a>
                        </div>
                    <div className="content">
                        <ListC data={this.state.data}/>
                    </div>
                </div>
            </div>
        );
    }
}




