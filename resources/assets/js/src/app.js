import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Voting} from './components';
import {Button,Icon} from 'antd';



export default class App extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }

    componentDidMount(){
       
    }
    render() {
        return (
            <div className="container" >
                    <div className="flex-center position-ref full-height">
                        <div className="top-right links">
                            <Link to="/">SOEN341-SC4</Link>
                            <a href="login">Login</a>
                            <a href="register">Register</a>
                        </div>
                    <div className="content">
                        <Voting/>
                    </div>
                </div>
            </div>
        );
    }
}




