// eslint-disable-next-line no-unused-vars
import React, { useReducer, ChangeEvent } from "react";
import { GameEvent } from "../../types/GameEvent";
import { useDispatch, useSelector } from "react-redux";
import EventForm from "./EventForm";
import { addEvent } from "../../services/events.service";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";

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

const AddEventForm = ({ event }: any) => {
    const dispatch = useDispatch();
    const isUserLogged = useSelector(
        (state: State) => state.userState.isUserLogged
    );
    const loggedInUser = useSelector(
        (state: State) => state.userState.loggedInUser
    );
    let initialState;
    if (event) {
        initialState = event;
    } else {
        initialState = new GameEvent();
        initialState.owner = loggedInUser?.id;
    }
    const [gameEvent, setGameEvent] = useReducer(reducer, initialState);

    const handleSubmit = () => {
        dispatch(addEvent(gameEvent));
        setGameEvent({ type: "clearState" });
    };

    const handleChange = (event: ChangeEvent<any>) => {
        const elementName = event.target.id;
        const nameParts = elementName.split("_");
        const name = nameParts[0];
        if (name === "slots") {
            event.target.value = parseInt(event.target.value);
            setGameEvent({
                type: "updateState",
                payload: { name: "freeSlots", value: event.target.value },
            });
        }
        setGameEvent({
            type: "updateState",
            payload: { name: name, value: event.target.value },
        });
    };

    if (!isUserLogged) {
        return <div>Please log in!</div>;
    }

    return (
        <div className='AddEvent'>
            <h1>Add Event</h1>
            <EventForm
                gameEvent={gameEvent}
                displaySubmit={true}
                onSubmit={handleSubmit}
                onChange={handleChange}
            ></EventForm>
        </div>
    );
};

export default AddEventForm;
