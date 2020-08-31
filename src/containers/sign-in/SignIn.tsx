// eslint-disable-next-line no-unused-vars
import React, { FormEvent, ChangeEvent, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { requestAddUser } from "../../actions/user/UserActions";
import { User } from "../../types/User";
import { useDispatch } from "react-redux";
import { Form, Field } from "react-final-form";

/**
 * Extends the User class with additional field for repeat password
 */
class SignInUser extends User {
    repeatPassword: string = "";
}
const SignInForm = () => {
    const [user, setUser] = useState(new SignInUser());
    const dispatch = useDispatch();
    const required = (value) => (value ? undefined : "Required");

    const validateForm = (values) => {
        const errors: any = {};
        if (values.password !== values.repeatPassword) {
            errors.repeatPassword = "Passwords must match";
        }

        return errors;
    };
    const onSubmit = (newUser: any) => {
        dispatch(requestAddUser(newUser));
        setUser(new SignInUser());
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

    return (
        <div>
            <h1>Sign In</h1>
            <Form
                onSubmit={onSubmit}
                validate={validateForm}
                subscription={{ submitting: true, pristine: true }}
                initialValues={user}
                render={({ handleSubmit, submitting, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <FormField
                            id='firstName'
                            label='First Name'
                            name='firstName'
                            type='text'
                            validate={required}
                        />
                        <FormField
                            id='lastName'
                            label='Last Name'
                            name='lastName'
                            type='text'
                            validate={required}
                        />
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
                        <FormField
                            id='repeatPassword'
                            label='Repeat Password'
                            name='repeatPassword'
                            type='password'
                            validate={required}
                        />
                        <Button
                            block
                            disabled={submitting || pristine}
                            type='submit'
                        >
                            Sign In
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default SignInForm;
