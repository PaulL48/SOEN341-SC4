import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components";
import axios from "axios";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handlePasswordValidation(e) {
    this.setState({
      password: e.target.value
    });
    const regex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/ //Minimum six characters, at least one letter, one number and one special character
    );
    setTimeout(() => {
      console.log(regex.test(this.state.password));
    }, 100);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    axios.get("user", {
        email,
        password
      })
      .then(response => {
        this.setState({ err: false });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({ err: true });
      });
      axios.get("api/logout/check").then(response => {
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
                <div className="panel-heading">Login</div>
                <div className="panel-body">
                  <form
                    className="form-horizontal"
                    method="POST"
                    onSubmit={this.onSubmit.bind(this)}
                  >
                    <div className="form-group">
                      <label htmlFor="email" className="col-md-4 control-label">
                        E-Mail Address
                      </label>

                      <div className="col-md-6">
                        <input
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          required
                          autoFocus
                        />

                        <span className="help-block" />
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
                          onChange={e => this.handlePasswordValidation(e)}
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          required
                        />

                        <span className="help-block">
                          <strong />
                        </span>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-6 col-md-offset-4">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" name="remember" /> Remember
                            Me
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-8 col-md-offset-4">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>

                        <Link to="/reset_password" className="btn btn-link">Forgot Your Password?</Link>
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
