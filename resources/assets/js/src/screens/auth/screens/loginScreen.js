import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Header} from '../../../components';
import {setCurrentUserAction} from '../auth.actions';
import {withRouter} from "react-router-dom";
import Axios from 'axios';

const mapStateToProps = state =>({
    isLoggedIn : state.auth.isLoggedIn
});
const mapDispatchToProps = dispatch =>({
    setCurrentUserActionDispatch : () => dispatch(setCurrentUserAction()),
});


export class Login extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password: ''
        };
        this.token = document.head.querySelector('meta[name="csrf-token"]').content;
    }

    handleLogin(e){
        e.preventDefault();
        Axios.request({
            method:'post',
            url: '/login',
            data:{
                email: this.state.email,
                password : this.state.password
            }
        }).then((res)=>{
            console.log(res);
            this.props.setCurrentUserActionDispatch();
            this.props.history.push("/");
        }).catch((err)=>{
            console.log(err);
        });
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
                                <form className="form-horizontal" onSubmit={(e)=>this.handleLogin(e)}>
                                <input type="hidden" name="_token" value={this.token}/>
                                    <div className="form-group {{ $errors->has('email') ? ' has-error' : '' }}">
                                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input onChange={(e)=>{this.setState({email:e.target.value});}} id="email" type="email" className="form-control" name="email" required autoFocus/>
                                                <span className="help-block">
                                                    <strong></strong>
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                        <div className="col-md-6">
                                            <input onChange={(e)=>{this.setState({password:e.target.value});}} id="password" type="password" className="form-control" name="password" required/>
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

export const LoginScreen = withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
