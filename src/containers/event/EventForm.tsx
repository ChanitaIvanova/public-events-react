// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import "./Form.css";
import { Field } from "redux-form";
const isRequired = (value) => {
    if (value && value.trim()) {
        return;
    }

    return "Required!";
};
const requiredSlots = (value) =>
    parseInt(value) > 0 ? undefined : "Should be greater than 0";

const EventForm = ({
    reset,
    gameEvent,
    displaySubmit,
    handleSubmit,
    submitting,
}: any) => {
    const renderField = ({
        id,
        input,
        label,
        type,
        meta: { touched, error, warning },
    }: any) => (
        <div>
            <label htmlFor={id}>{label}</label>
            <div>
                <input
                    id={id}
                    {...input}
                    value={input.value}
                    onChange={input.onChange}
                    type={type}
                />
                {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    );

    const timePicker = (props: any) => {
        const {
            input: { value, onChange },
            id,
        } = props;
        return (
            <TimePicker
                id={id}
                className='select-dropdown'
                start='00:00'
                end='23:59'
                step={30}
                format={24}
                value={value}
                onChange={onChange}
            />
        );
    };

    const onSubmit = (newEvent: any) => {
        const errors = handleSubmit(newEvent);
        if (!errors) {
            reset();
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <Field
                id={"name_" + gameEvent.id}
                label='Event Name'
                name='name'
                component={renderField}
                type='text'
                validate={isRequired}
            />
            <div>
                <label htmlFor={"game_" + gameEvent.id}>Game Name</label>
                <Field
                    id={"game_" + gameEvent.id}
                    name='game'
                    component={renderField}
                    type='text'
                    validate={isRequired}
                />
            </div>
            <div>
                <label htmlFor={"city_" + gameEvent.id}>City</label>
                <Field
                    id={"city_" + gameEvent.id}
                    name='city'
                    component={renderField}
                    type='text'
                    validate={isRequired}
                />
            </div>
            <div>
                <label htmlFor={"address_" + gameEvent.id}>Address</label>
                <Field
                    id={"address_" + gameEvent.id}
                    name='address'
                    component={renderField}
                    type='text'
                    validate={isRequired}
                />
            </div>
            <div>
                <label htmlFor={"date_" + gameEvent.id}>Date</label>
                <Field
                    id={"date_" + gameEvent.id}
                    name='date'
                    component={renderField}
                    type='date'
                />
            </div>
            <div>
                <label htmlFor={"time_" + gameEvent.id}>Time</label>
                <Field
                    id={"time_" + gameEvent.id}
                    name='time'
                    component={timePicker}
                />
            </div>
            <div>
                <label htmlFor={"slots_" + gameEvent.id}>Slots</label>
                <Field
                    id={"slots_" + gameEvent.id}
                    name='slots'
                    component={renderField}
                    type='number'
                    validate={requiredSlots}
                />
            </div>
            {displaySubmit && (
                <Button block disabled={submitting} type='submit'>
                    Create event
                </Button>
            )}
        </form>
    );
};

export default EventForm;
