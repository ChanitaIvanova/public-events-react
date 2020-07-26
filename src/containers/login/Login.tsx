import React, { FormEvent, Component, ChangeEvent, } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { logIn } from '../../actions/user/UserActions'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { User } from '../../types/User'

function mapDispatchToProps(dispatch: any) {
  return {
      logIn: (id: number) => dispatch(logIn(id))
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
        email: "", 
        userIsMissing: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event: FormEvent) {
      event.preventDefault();
      const user = this.props.users.find((user: User) => {
        return user.email === this.state.email && user.password === this.state.password;
      })
      if (user) {
        this.props.logIn(user.id);
      } else {
        this.setState({ userIsMissing: true });
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
        {this.state.userIsMissing &&
          <div className="card-panel teal lighten-2">There is no such user</div>
        }
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
           users: state.setupUser.users
  }
}

const LogInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default LogInForm;