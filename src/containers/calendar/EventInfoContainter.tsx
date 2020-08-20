import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { freeGameSlot } from "../../services/events.service";
import { removeEventForUser } from "../../services/users.service";
import { freeSlotForUser } from "../../actions/user/UserActions";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import EventInfo from "./EventInfo";

const EventInfoContainer = ({ eventId }: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: State) => state.userState.loggedInUser);
    const event = useSelector((state: State) => {
        return state.events.find((event) => {
            return event.id.toString() === eventId;
        });
    });

    const handleClick = () => {
        if (!user || !event) return;
        removeEventForUser(user, event.id);
        freeGameSlot(event);
        dispatch(freeSlotForUser(event.id));
    };

    return <EventInfo event={event} handleClick={handleClick}></EventInfo>;
};

export default EventInfoContainer;
