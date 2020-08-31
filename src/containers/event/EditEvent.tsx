// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import M from "materialize-css";
import EventForm from "./EventForm";
import { updateGameEvent } from "../../services/events.service";
import { submit } from "redux-form";
import { reduxForm } from "redux-form";
import { State } from "../../reducers/initialState";
import { GameEvent } from "../../types/GameEvent";
import { useSelector } from "react-redux";

const EditEvent = ({ eventId }: any) => {
    const dispatch = useDispatch();
    const [gameEvent, setGameEvent] = useState({});
    const [displayForm, setDisplayForm] = useState(false);
    let modal: any;

    const events = useSelector((state: State) => state.eventsState.events);
    useEffect(() => {
        const event = events.find((event) => {
            return event.id === eventId;
        });

        if (event) {
            setGameEvent(event);
        }
        setDisplayForm(true);
    }, []);

    useEffect(() => {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%",
        };
        // eslint-disable-next-line
        M.Modal.init(modal, options);
    }, []);

    const handleSubmit = (editedEvent) => {
        editedEvent.slots = parseInt(editedEvent.slots);
        editedEvent.freeSlots =
            parseInt((gameEvent as any).freeSlots) +
            (editedEvent.slots - parseInt((gameEvent as any).slots));
        dispatch(updateGameEvent(editedEvent));
    };

    const formName = "gameEventForm_" + eventId;
    const GameEventForm = reduxForm({
        // a unique name for the form
        form: formName,
    })(EventForm);

    const handleClick = () => {
        dispatch(submit(formName));
    };
    return (
        <>
            <button
                className='waves-effect waves-light btn modal-trigger'
                data-target={"modal_" + eventId}
            >
                Edit
            </button>

            <div
                ref={(Modal) => {
                    modal = Modal;
                }}
                id={"modal_" + eventId}
                className='modal'
            >
                {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                <div className='modal-content'>
                    <h2>Edit Event</h2>
                    {displayForm && (
                        <GameEventForm
                            initialValues={gameEvent}
                            gameEvent={gameEvent}
                            displaySubmit={false}
                            onSubmit={handleSubmit}
                        ></GameEventForm>
                    )}
                </div>
                <div className='modal-footer'>
                    <button className='modal-close waves-effect waves-red btn-flat'>
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className='modal-close waves-effect waves-green btn'
                    >
                        Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditEvent;
