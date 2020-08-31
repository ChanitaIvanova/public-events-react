import React from "react";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
const EventActions = ({ event }: any) => {
    return (
        <div>
            <DeleteEvent eventId={event.id}></DeleteEvent>
            <EditEvent eventId={event.id}></EditEvent>
        </div>
    );
};

export default EventActions;
