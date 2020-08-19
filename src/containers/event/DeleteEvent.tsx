import React from "react";
import { useDispatch } from "react-redux";
import { removeGameEvent } from "../../services/events.service";

const DeleteEvent = ({ eventId }: any) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(removeGameEvent(eventId));
    };
    return (
        <button className='btn red lighten-2' onClick={handleClick}>
            Delete
        </button>
    );
};

export default DeleteEvent;
