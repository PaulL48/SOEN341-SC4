import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';


export default class App extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }

    componentDidMount(){
        Axios.get('checkUser').then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
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
                        <div className="title m-b-md">
                            Laravel
                        </div>
                        <div className="links">
                            <a href="https://laravel.com/docs">Documentation</a>
                            <a href="https://laracasts.com">Laracasts</a>
                            <a href="https://laravel-news.com">News</a>
                            <a href="https://forge.laravel.com">Forge</a>
                            <a href="https://github.com/laravel/laravel">GitHub</a>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




