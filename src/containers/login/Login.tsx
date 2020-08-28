/* eslint-disable no-unused-vars */
import React, { FormEvent, ChangeEvent, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { requestLogInUser } from "../../actions/user/UserActions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";

const LogInForm = () => {
    const isUserLogged = useSelector(
        (state: State) => state.userState.isUserLogged
    );
    const dispatch = useDispatch();
    const initialState = {
        password: "",
        email: "",
        userIsMissing: false,
    };
    const [loginData, setLoginData] = useState(initialState);

    const validateForm = () => {
        return loginData.email.length > 0 && loginData.password.length > 0;
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(requestLogInUser(loginData.email, loginData.password));
    };

    const handleChange = (event: ChangeEvent<any>) => {
        setLoginData({ ...loginData, [event.target.id]: event.target.value });
    };

    if (isUserLogged) {
        return <Redirect to='/' />;
    }
    return (
        <div className='Login'>
            <h1>Log In</h1>
            {loginData.userIsMissing && (
                <div className='card-panel teal lighten-2'>
                    There is no such user
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <FormGroup controlId='email'>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type='email'
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={loginData.password}
                        onChange={handleChange}
                        type='password'
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type='submit'>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LogInForm;
