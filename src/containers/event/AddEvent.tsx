// eslint-disable-next-line no-unused-vars
import React, { useReducer, ChangeEvent } from "react";
import { addGameEvent } from "../../actions/GameEventActions";
import { connect } from "react-redux";
import { GameEvent } from "../../types/GameEvent";
import EventForm from "./EventForm";

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

const AddEvent = ({ isUserLogged, loggedInUser, addGameEvent, event }: any) => {
    let initialState;
    if (event) {
        initialState = event;
    } else {
        initialState = new GameEvent();
        initialState.owner = loggedInUser.id;
    }
    const [state, setState] = useReducer(reducer, initialState);

    const handleSubmit = () => {
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
            <EventForm
                gameEvent={state}
                displaySubmit={true}
                onSubmit={handleSubmit}
                onChange={handleChange}
            ></EventForm>
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
