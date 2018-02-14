import React, { Component } from 'react';
import {Link} from 'react-router-dom';
<<<<<<< HEAD
import {Voting} from './components';
import {Button,Icon} from 'antd';

=======
import ReactDOM from 'react-dom';
import {ListC} from './components';
>>>>>>> master


export default class App extends Component {
    constructor(){
        super();
        this.state={
            
        };
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
<<<<<<< HEAD
                        <Voting/>
=======
                        <div className="title m-b-md">
                            Questions
                        </div>
                        <div className="QuestionsHP">
                            <ListC/>
                        </div>
>>>>>>> master
                    </div>
                </div>
            </div>
        );
    }
}




