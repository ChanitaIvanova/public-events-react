// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import M from "materialize-css";
import EventForm from "./EventForm";
import { editGameEvent } from "../../actions/GameEventActions";

const EditEvent = ({ event }: any) => {
    const dispatch = useDispatch();
    const [gameEvent, setGameEvent] = useState(event);
    let modal: any;

    useEffect(() => {
        const options = {
            onOpenStart: () => {
                setGameEvent(event);
            },
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%",
        };
        // eslint-disable-next-line
        M.Modal.init(modal, options);
    }, [event, modal]);

    const handleChange = (chageEvent: ChangeEvent<any>) => {
        const elementName = chageEvent.target.id;
        const nameParts = elementName.split("_");
        const name = nameParts[0];
        if (name === "slots") {
            const slots = parseInt(chageEvent.target.value);
            setGameEvent({
                ...gameEvent,
                freeSlots:
                    parseInt(event.freeSlots) + (slots - parseInt(event.slots)),
                slots: chageEvent.target.value,
            });

            return;
        }
        setGameEvent({ ...gameEvent, [name]: chageEvent.target.value });
    };

    const validateForm = () => {
        const isValid: boolean =
            gameEvent.name.length > 0 &&
            gameEvent.game.length > 0 &&
            gameEvent.city.length > 0 &&
            gameEvent.address.length > 0 &&
            parseInt(gameEvent.slots) > 0 &&
            parseInt(gameEvent.slots) >= parseInt(event.slots);
        return isValid;
    };

    const handleClick = () => {
        dispatch(editGameEvent(gameEvent));
    };

    return (
        <>
            <button
                className='waves-effect waves-light btn modal-trigger'
                data-target={"modal_" + gameEvent.id}
            >
                Edit
            </button>

            <div
                ref={(Modal) => {
                    modal = Modal;
                }}
                id={"modal_" + gameEvent.id}
                className='modal'
            >
                {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                <div className='modal-content'>
                    <h2>Edit Event</h2>
                    <EventForm
                        gameEvent={gameEvent}
                        displaySubmit={false}
                        onChange={handleChange}
                    ></EventForm>
                </div>
                <div className='modal-footer'>
                    <button className='modal-close waves-effect waves-red btn-flat'>
                        Cancel
                    </button>
                    <button
                        disabled={!validateForm()}
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
