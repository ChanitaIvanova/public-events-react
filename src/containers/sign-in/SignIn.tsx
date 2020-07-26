import React, { FormEvent, Component, ChangeEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { signIn } from '../../actions/user/UserActions'
import { connect } from "react-redux";
import { User } from '../../types/User'

function mapDispatchToProps(dispatch: any) {
    return {
        signIn: (user: User) => dispatch(signIn(user))
    };
}
class SignInUser extends User {
    repeatPassword: string = "";
}
class SignIn extends Component {
    state: Readonly<SignInUser>;
    props: Readonly<any>;
    constructor(props: any) {
        super(props);
        this.props = props;
        this.state = new SignInUser();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0 
        && this.state.repeatPassword.length > 0 && this.state.password === this.state.repeatPassword
        && this.state.firstName.length > 0 && this.state.lastName.length > 0;
    }

    handleSubmit(event: FormEvent) {
        event.preventDefault();
        this.props.signIn(this.state);
        this.setState(new User());
    }

    handleChange(event: ChangeEvent<any>) {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="firstName">
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
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
                    <FormGroup controlId="repeatPassword">
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl
                            value={this.state.repeatPassword}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button block disabled={!this.validateForm()} type="submit">
                    Sign In
                    </Button>
                </form>
            </div>
        );
    }
}

const SignInForm = connect(
    null,
    mapDispatchToProps
  )(SignIn);
  
export default SignInForm;