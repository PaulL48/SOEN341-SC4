import React, { Component } from 'react';
import {Header} from '../../../components';


export class RegisterScreen extends Component {
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
        this.token = document.head.querySelector('meta[name="csrf-token"]').content;
    }

    render() {
        return (
            <div>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Register</div>

                            <div className="panel-body">
                                <form className="form-horizontal" method="POST" action="/register">
                                <meta name="csrf-token" content="{{ csrf_token() }}"/>
                                <input type="hidden" name="_token" value={this.token}/>

                                    <div className="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                        <label htmlFor="name" className="col-md-4 control-label">Name</label>

                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control" name="name" required autoFocus/>

                                                <span className="help-block">
                                                    <strong></strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email"  required/>
                                                <span className="help-block">
                                                    <strong></strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                        <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" name="password" required />
                                                <span className="help-block">
                                                    <strong></strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>

                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
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
