/* eslint-disable no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { requestLogInUser } from "../../actions/user/UserActions";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { Form, Field } from "react-final-form";

const LogInForm = () => {
    const isUserLogged = useSelector(
        (state: State) => state.userState.isUserLogged
    );
    const dispatch = useDispatch();
    const required = (value) => (value ? undefined : "Required");
    const initialState = {
        password: "",
        email: "",
        userIsMissing: false,
    };
    const [loginData, setLoginData] = useState(initialState);

    const onSubmit = (values: any) => {
        dispatch(requestLogInUser(values.email, values.password));
    };

    const FormField = ({ id, label, name, type, validate }: any) => {
        return (
            <div>
                <Field name={name} validate={validate}>
                    {({ input, meta }) => (
                        <div>
                            <label htmlFor={id}>{label}</label>
                            <input
                                {...input}
                                id={id}
                                type={type}
                                placeholder={label}
                            />
                            {meta.error && meta.touched && (
                                <span>{meta.error}</span>
                            )}
                        </div>
                    )}
                </Field>
            </div>
        );
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
            <Form
                onSubmit={onSubmit}
                subscription={{ submitting: true, pristine: true }}
                initialValues={loginData}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <FormField
                            id='email'
                            label='Email'
                            name='email'
                            type='email'
                            validate={required}
                        />
                        <FormField
                            id='password'
                            label='Password'
                            name='password'
                            type='password'
                            validate={required}
                        />
                        <Button
                            block
                            disabled={submitting || pristine}
                            type='submit'
                        >
                            Login
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default LogInForm;
