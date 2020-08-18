import React from "react";
import { useDispatch } from "react-redux";
import { deleteGameEvent } from "../../actions/GameEventActions";

const DeleteEvent = ({ eventId }: any) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(deleteGameEvent(eventId));
    };
    return (
        <button className='btn red lighten-2' onClick={handleClick}>
            Delete
        </button>
    );
};

export default DeleteEvent;
