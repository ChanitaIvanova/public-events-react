// eslint-disable-next-line no-unused-vars
import React, { FormEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

const EventForm = ({ gameEvent, displaySubmit, onSubmit, onChange }: any) => {
    const validateForm = () => {
        const isValid: boolean =
            gameEvent.name.length > 0 &&
            gameEvent.game.length > 0 &&
            gameEvent.city.length > 0 &&
            gameEvent.address.length > 0 &&
            gameEvent.slots > 0 &&
            gameEvent.freeSlots > 0 &&
            gameEvent.freeSlots <= gameEvent.slots;
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
            <FormGroup controlId={"slots_" + gameEvent.id}>
                <FormLabel>Slots</FormLabel>
                <FormControl
                    value={gameEvent.slots}
                    onChange={onChange}
                    type='number'
                />
            </FormGroup>
            <FormGroup controlId={"freeSlots_" + gameEvent.id}>
                <FormLabel>Free Slots</FormLabel>
                <FormControl
                    value={gameEvent.freeSlots}
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
