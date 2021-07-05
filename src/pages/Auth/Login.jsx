import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/user";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Log in now!</h1>
            <p className="lead">
              Log in now and start shopping in the most affordable ecommerce
              platform
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3">Log in</h5>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control-my2"
                  onChange={this.inputHandler}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control-my2"
                  onChange={this.inputHandler}
                />
                <div className="d-flex flex-row justify-content-between align-items-content">
                  <button
                    onClick={() => this.props.loginUser(this.state)}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                  <Link to="/register">Or register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
