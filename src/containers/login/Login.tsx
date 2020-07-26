import React, { FormEvent, Component, ChangeEvent, } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { logIn } from '../../actions/user/UserActions'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function mapDispatchToProps(dispatch: any) {
  return {
      logIn: () => dispatch(logIn())
  };
}

class LogIn extends Component {
  state: any;
  props: Readonly<any>;
  constructor(props: any) {
      super(props);
      this.props = props;
      this.state = {
        password: "",
        email: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event: FormEvent) {
      event.preventDefault();
      if (this.props.user.email === this.state.email && this.props.user.password === this.state.password) {
        this.props.logIn();
      }
  }

  handleChange(event: ChangeEvent<any>) {
      this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    if (this.props.isUserLogged) {
      return (
        <Redirect to="/"/>
      )
    }
    return (
      <div className="Login">
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel >Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state: any) {
  return { isUserLogged: state.setupUser.isUserLogged,
           user: state.setupUser.user 
  }
}

const LogInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default LogInForm;