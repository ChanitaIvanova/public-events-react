// eslint-disable-next-line no-unused-vars
import React, { useState, ChangeEvent, useEffect } from "react";
import { GameEvent } from "../../types/GameEvent";
import { useDispatch, useSelector } from "react-redux";
import EventForm from "./EventForm";
import { addEvent } from "../../services/events.service";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { reduxForm } from "redux-form";
import { useRouteMatch } from "react-router-dom";
const AddEventForm = () => {
    const match = useRouteMatch("/edit-event/:id");
    const dispatch = useDispatch();
    const isUserLogged = useSelector(
        (state: State) => state.userState.isUserLogged
    );
    const loggedInUser = useSelector(
        (state: State) => state.userState.loggedInUser
    );

    const initialState = new GameEvent();
    initialState.owner = loggedInUser?.id;
    const [gameEvent, setGameEvent] = useState(initialState);
    const [displayForm, setDisplayForm] = useState(false);

    const events = useSelector((state: State) => state.eventsState.events);
    const id = match ? parseInt((match?.params as any).id) : -1;
    useEffect(() => {
        const event = events.find((event) => {
            return event.id === id;
        });

        if (event) {
            setGameEvent(event);
        }
        setDisplayForm(true);
    }, []);

    const handleSubmit = (newEvent: any) => {
        newEvent.slots = parseInt(newEvent.slots);
        newEvent.freeSlots = newEvent.slots;
        dispatch(addEvent(newEvent));
    };

    const GameEventForm = reduxForm({
        // a unique name for the form
        form: "gameEventForm",
    })(EventForm);

    if (!isUserLogged) {
        return <div>Please log in!</div>;
    }

    return (
        <div className='AddEvent'>
            <h1>Add Event</h1>
            {displayForm && (
                <GameEventForm
                    initialValues={gameEvent}
                    gameEvent={gameEvent}
                    displaySubmit={true}
                    onSubmit={handleSubmit}
                ></GameEventForm>
            )}
        </div>
    );
};

export default AddEventForm;
