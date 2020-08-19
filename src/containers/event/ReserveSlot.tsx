import React from "react";
import { useDispatch } from "react-redux";
import { reserveSlotForUser } from "../../actions/user/UserActions";
import { reserveGameSlot } from "../../services/events.service";
import { addEventForUser } from "../../services/users.service";

const ReserveSlot = ({ event, user }: any) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(reserveSlotForUser(event.id));
        reserveGameSlot(event);
        addEventForUser(user, event.id);
    };
    return (
        <button className='btn' onClick={handleClick}>
            Reserve
        </button>
    );
};

export default ReserveSlot;
