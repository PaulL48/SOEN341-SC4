import React, { Component } from 'react';
import {Link} from 'react-router-dom';


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
                            <Link to="/login">React Login</Link>
                            <Link to="/register">Register</Link>
                            <a href="login">PHP Login(Make it the same)</a>
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




