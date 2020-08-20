// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import { freeGameSlot, formatTime } from "../../services/events.service";
import { removeEventForUser } from "../../services/users.service";
import { freeSlotForUser } from "../../actions/user/UserActions";
import { State } from "../../reducers/initialState";
import "./EventInfo.css";

const EventInfo = ({ eventId }: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.userState.loggedInUser);
    const event = useSelector((state: State) => {
        return state.events.find((event) => {
            return event.id.toString() === eventId;
        });
    });
    let modal: any;
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
    }, [event, modal]);

    const handleClick = () => {
        if (!user || !event) return;
        removeEventForUser(user, event.id);
        freeGameSlot(event);
        dispatch(freeSlotForUser(event.id));
    };
    if (!event) {
        return null;
    }
    return (
        <>
            <em
                className='waves-effect waves-light modal-trigger'
                data-target={"modal_" + event.id}
            >
                {event.name + " " + formatTime(event)}
            </em>

            <div
                ref={(Modal) => {
                    modal = Modal;
                }}
                id={"modal_" + event.id}
                className='modal'
            >
                {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
                <div className='modal-content'>
                    <section>
                        <h2>{event.name}</h2>
                        <dl>
                            <dt>Game</dt>
                            <dd>{event.game}</dd>
                            <dt>City</dt>
                            <dd>{event.city}</dd>
                            <dt>Address</dt>
                            <dd>{event.address}</dd>
                            <dt>Date</dt>
                            <dd>{event.date}</dd>
                            <dt>Time</dt>
                            <dd>{formatTime(event)}</dd>
                        </dl>
                    </section>
                </div>
                <div className='modal-footer'>
                    <button className='modal-close waves-effect waves-red btn-flat'>
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className='modal-close waves-effect waves-light red lighten-2 btn'
                    >
                        Leave
                    </button>
                </div>
            </div>
        </>
    );
};

export default EventInfo;
