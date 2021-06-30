import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    fullname: "",
    username: "",
    email: "",
    password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  registerHandler = () => {
    alert(
      `Fullname: ${this.state.fullname}\nUser Name: ${this.state.username}\nEmail: ${this.state.email}\nPassword: ${this.state.password}`
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Register now!</h1>
            <p className="lead">
              Register now and start shopping in the most affordable e commerce
              platform
            </p>
          </div>
        </div>
        <div className="rom mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Register</h5>
                <input
                  onClick={this.inputHandler}
                  name="fullname"
                  placeholder="Full Name"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  onClick={this.inputHandler}
                  name="username"
                  placeholder="User Name"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  onClick={this.inputHandler}
                  name="email"
                  placeholder="Email"
                  type="text"
                  className="form-control my-2"
                />
                <input
                  onClick={this.inputHandler}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control my-2"
                />
                <div className="d-flex flex-row justify-content-between align-item-center">
                  <button
                    onClick={this.registerHandler}
                    className="btn btn-primary mt-2"
                  >
                    Register
                  </button>
                  <Link to="/login">Or Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
