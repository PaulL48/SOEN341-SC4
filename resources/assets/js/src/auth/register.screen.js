import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components";
import axios from "axios";

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { name, email, password, password_confirmation } = this.state;
    axios.post("/api/register", {
        name,
        email,
        password,
        password_confirmation
      })
      .then(response => {
        console.log(response);
        this.setState({ err: false });
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
                <div className="panel-heading">Register</div>

                <div className="panel-body">
                  <form
                    className="form-horizontal"
                    method="POST"
                    onSubmit={this.onSubmit.bind(this)}
                  >
                    <div className="form-group">
                      <label htmlFor="name" className="col-md-4 control-label">
                        Name
                      </label>

                      <div className="col-md-6">
                        <input
                          id="name"
                          type="text"
                          className="form-control"
                          name="name"
                          onChange={e =>
                            this.setState({ name: e.target.value })
                          }
                          required
                          autoFocus
                        />
                        <span className="help-block">
                          <strong />
                        </span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="col-md-4 control-label">
                        E-Mail Address
                      </label>

                      <div className="col-md-6">
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                          required
                        />
                        <span className="help-block">
                          <strong />
                        </span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="col-md-4 control-label"
                      >
                        Password
                      </label>

                      <div className="col-md-6">
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                          required
                        />

                        <span className="help-block">
                          <strong />
                        </span>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        htmlFor="password-confirm"
                        className="col-md-4 control-label"
                      >
                        Confirm Password
                      </label>

                      <div className="col-md-6">
                        <input
                          id="password-confirm"
                          type="password"
                          className="form-control"
                          name="password_confirmation"
                          onChange={e =>
                            this.setState({
                              password_confirmation: e.target.value
                            })
                          }
                          required
                        />
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
