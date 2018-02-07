import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../components';

export class Login extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <div className="panel-heading">Login</div>

                                <div className="panel-body">
                                    <form className="form-horizontal" method="POST">
                                        

                                        <div className="form-group">
                                            <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                            <div className="col-md-6">
                                                <input id="email" type="email" className="form-control" name="email" required autoFocus/>

                                            
                                                    <span className="help-block">
                                                        
                                                    </span>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label  htmlFor="password" className="col-md-4 control-label">Password</label>

                                            <div className="col-md-6">
                                                <input id="password" type="password" className="form-control" name="password" required/>

                                            
                                                    <span className="help-block">
                                                        <strong></strong>
                                                    </span>
                                            
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-6 col-md-offset-4">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="remember"/> Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-md-8 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Login
                                                </button>

                                                <a className="btn btn-link">
                                                    Forgot Your Password?
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}




