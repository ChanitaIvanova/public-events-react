// eslint-disable-next-line no-unused-vars
import React, { FormEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import "./Form.css";

const EventForm = ({ gameEvent, displaySubmit, onSubmit, onChange }: any) => {
    const validateForm = () => {
        const isValid: boolean =
            gameEvent.name.length > 0 &&
            gameEvent.game.length > 0 &&
            gameEvent.city.length > 0 &&
            gameEvent.address.length > 0 &&
            parseInt(gameEvent.slots) > 0;
        return isValid;
    };

    const handleSubmit = (formEvent: FormEvent) => {
        formEvent.preventDefault();
        onSubmit(gameEvent);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup controlId={"name_" + gameEvent.id}>
                <FormLabel>Event Name</FormLabel>
                <FormControl
                    autoFocus
                    type='text'
                    value={gameEvent.name}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup controlId={"game_" + gameEvent.id}>
                <FormLabel>Game Name</FormLabel>
                <FormControl
                    type='text'
                    value={gameEvent.game}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup controlId={"city_" + gameEvent.id}>
                <FormLabel>City</FormLabel>
                <FormControl
                    type='text'
                    value={gameEvent.city}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup controlId={"address_" + gameEvent.id}>
                <FormLabel>Address</FormLabel>
                <FormControl
                    value={gameEvent.address}
                    onChange={onChange}
                    type='text'
                />
            </FormGroup>
            <FormGroup controlId={"date_" + gameEvent.id}>
                <FormLabel>Date</FormLabel>
                <FormControl
                    className='datepicker'
                    value={gameEvent.date}
                    onChange={onChange}
                    type='date'
                />
            </FormGroup>
            <FormGroup controlId={"time_" + gameEvent.id}>
                <FormLabel>Time</FormLabel>
                <TimePicker
                    className='select-dropdown'
                    start='00:00'
                    end='23:59'
                    step={30}
                    format={24}
                    value={gameEvent.time}
                    onChange={(newTime: string) => {
                        onChange({
                            target: {
                                id: "time_" + gameEvent.id,
                                value: newTime,
                            },
                        });
                    }}
                />
            </FormGroup>
            <FormGroup controlId={"slots_" + gameEvent.id}>
                <FormLabel>Slots</FormLabel>
                <FormControl
                    value={gameEvent.slots}
                    onChange={onChange}
                    type='number'
                />
            </FormGroup>
            {displaySubmit && (
                <Button block disabled={!validateForm()} type='submit'>
                    Create event
                </Button>
            )}
        </form>
    );
};

export default EventForm;
