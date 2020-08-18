import React from "react";
import { useDispatch } from "react-redux";
import { reserveSlotForUser } from "../../actions/user/UserActions";

const ReserveSlot = ({ eventId, userId }: any) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(reserveSlotForUser(eventId, userId));
    };
    return (
        <button className='btn' onClick={handleClick}>
            Reserve
        </button>
    );
};

export default ReserveSlot;
