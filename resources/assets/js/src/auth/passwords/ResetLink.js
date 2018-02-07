import React, { Component } from "react";
import {Header} from '../../components';
import axios from 'axios';


export class ResetLink extends Component {
  constructor() {
    super();
    this.state = {
        email: "",
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    axios.post("api/password/email", {
        email,
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
                                    

                                    <div className="form-group">
                                        <label htmlFor="email" className="col-md-4 control-label">E-Mail Address</label>

                                        <div className="col-md-6">
                                            <input id="email" type="email" onChange={(e)=>this.setState({email:e.target.value})} className="form-control" name="email" placeholder="email" required />
                                                <span className="help-block">
                                                    
                                                </span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-md-6 col-md-offset-4">
                                            <button type="submit" className="btn btn-primary">
                                                Send Password Reset Link
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
