import React, { Component } from "react";
import {Header} from '../../components';
import axios from 'axios';


export class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
        token: document.head.querySelector('meta[name="csrf-token"]').content,
        email: "",
        password: "",
        password_confirmation: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { token,email, password, password_confirmation } = this.state;
    axios.post("api/password/reset", {
        token,
        email,
        password,
        password_confirmation
      })
      .then(response => {
        this.setState({ err: false });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({ err: true });
      });
  }

  render() {
    return (
        <div>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-heading">Reset Password</div>

                            <div className="panel-body">
                                <form className="form-horizontal" method="POST" onSubmit={this.onSubmit.bind(this)}>

                                    <input type="hidden" name="token" />

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" onChange={(e)=>this.setState({email:e.target.value})} className="form-control" name="email" placeholder="email here" required autoFocus />
                                                <span className="help-block">
                                                    
                                                </span>
                                            
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="col-md-4 control-label">Password</label>

                                        <div className="col-md-6">
                                            <input id="password" type="password" onChange={(e)=>this.setState({password:e.target.value})} className="form-control" name="password" required />

                                            
                                                <span className="help-block">
                                                    
                                                </span>
                                            
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-confirm" className="col-md-4 control-label">Confirm Password</label>
                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" onChange={(e)=>this.setState({password_confirmation:e.target.value})} className="form-control" name="password_confirmation" required />
                                                <span className="help-block">
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary">
                                                Reset Password
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
