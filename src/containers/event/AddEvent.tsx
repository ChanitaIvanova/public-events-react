// eslint-disable-next-line no-unused-vars
import React, { useReducer, FormEvent, ChangeEvent } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { addGameEvent } from "../../actions/GameEventActions";
import { connect } from "react-redux";
import { GameEvent } from "../../types/GameEvent";

/**
 * Maps the reducer function to the properties of the component
 * @param {any} dispatch method that will dispatch the function to the reducer
 * @return {any} Object that will contain the new properties
 */
function mapDispatchToProps(dispatch: any) {
    return {
        addGameEvent: (event: GameEvent) => dispatch(addGameEvent(event)),
    };
}

const initialState = new GameEvent();

/**
 * Apply different changes on the state
 * @param {GameEvent} state the current state
 * @param {any} action action that will be applied on the state
 * @return {GameEvcent} returns the new state
 */
function reducer(state: GameEvent, action: { type: string; payload?: any }) {
    switch (action.type) {
        case "updateState":
            return { ...state, [action.payload.name]: action.payload.value };
        case "clearState":
            const newState = new GameEvent();
            return newState;
        default:
            return state;
    }
}

const AddEvent = ({ isUserLogged, loggedInUser, addGameEvent }: any) => {
    const [state, setState] = useReducer(reducer, initialState);
    const validateForm = () => {
        return (
            state.name.length > 0 &&
            state.game.length > 0 &&
            state.city.length > 0 &&
            state.address.length > 0 &&
            state.slots > 0 &&
            state.freeSlots > 0 &&
            state.freeSlots <= state.slots
        );
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        addGameEvent(state);
        setState({ type: "clearState" });
    };

    const handleChange = (event: ChangeEvent<any>) => {
        setState({
            type: "updateState",
            payload: { name: [event.target.id], value: event.target.value },
        });
    };

    if (!isUserLogged) {
        return <div>Please log in!</div>;
    }

    return (
        <div className='AddEvent'>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId='name'>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl
                        autoFocus
                        type='text'
                        value={state.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='game'>
                    <FormLabel>Game Name</FormLabel>
                    <FormControl
                        type='text'
                        value={state.game}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl
                        type='text'
                        value={state.city}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        value={state.address}
                        onChange={handleChange}
                        type='text'
                    />
                </FormGroup>
                <FormGroup controlId='slots'>
                    <FormLabel>Slots</FormLabel>
                    <FormControl
                        value={state.slots}
                        onChange={handleChange}
                        type='number'
                    />
                </FormGroup>
                <FormGroup controlId='freeSlots'>
                    <FormLabel>Free Slots</FormLabel>
                    <FormControl
                        value={state.freeSlots}
                        onChange={handleChange}
                        type='number'
                    />
                </FormGroup>
                <Button block disabled={!validateForm()} type='submit'>
                    Create event
                </Button>
            </form>
        </div>
    );
};
/**
 * Maps values of the state to properties of the component
 * @param {any} state the current state
 * @return {any} new object that contains part of the properies passed
 *  to the component
 */
function mapStateToProps({ userState }: any) {
    return {
        isUserLogged: userState.isUserLogged,
        loggedInUser: userState.loggedInUser,
    };
}
const AddEventForm = connect(mapStateToProps, mapDispatchToProps)(AddEvent);

export default AddEventForm;
