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
    render() {
        return (
            <div className="container" >
                    <div className="flex-center position-ref full-height">
                        <div className="top-right links">
                            <Link to="/">Home</Link>
                            <a href="login">Login</a>
                            <a href="register">Register</a>
                            <Link to="/test" >Unauthenticated Route handle by react</Link>
                        </div>
                    <div className="content">
                        <Voting/>
                        <Icon type="caret-up" style={{fontSize:30}} />
                        <Button type="primary">Primary</Button>
                    </div>
                </div>
            </div>
        );
    }
}




