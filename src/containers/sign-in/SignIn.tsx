// eslint-disable-next-line no-unused-vars
import React, { FormEvent, ChangeEvent, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { requestAddUser } from "../../actions/user/UserActions";
import { User } from "../../types/User";
import { useDispatch } from "react-redux";

/**
 * Extends the User class with additional field for repeat password
 */
class SignInUser extends User {
    repeatPassword: string = "";
}
const SignInForm = () => {
    const [user, setUser] = useState(new SignInUser());
    const dispatch = useDispatch();

    const validateForm = () => {
        return (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.repeatPassword.length > 0 &&
            user.password === user.repeatPassword &&
            user.firstName.length > 0 &&
            user.lastName.length > 0
        );
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(requestAddUser(user));
        setUser(new SignInUser());
    };

    const handleChange = (event: ChangeEvent<any>) => {
        setUser({ ...user, [event.target.id]: event.target.value });
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId='firstName'>
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                        autoFocus
                        type='text'
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='lastName'>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                        type='text'
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type='email'
                        value={user.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={user.password}
                        onChange={handleChange}
                        type='password'
                    />
                </FormGroup>
                <FormGroup controlId='repeatPassword'>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl
                        value={user.repeatPassword}
                        onChange={handleChange}
                        type='password'
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type='submit'>
                    Sign In
                </Button>
            </form>
        </div>
    );
};

export default SignInForm;
