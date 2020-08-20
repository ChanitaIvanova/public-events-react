import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { formatTime } from "../../services/events.service";
import EventInfoContainer from "./EventInfoContainter";

const renderEventContent = (eventInfo: any) => {
    return (
        <EventInfoContainer eventId={eventInfo.event.id}></EventInfoContainer>
    );
};

const Calendar = () => {
    const user = useSelector((state: State) => state.userState.loggedInUser);
    const events = useSelector((state: State) => state.events);

    const eventsForUser = events
        .filter((event) => {
            return user?.events.indexOf(event.id) !== -1;
        })
        .map((event) => {
            return {
                id: event.id.toString(),
                title: event.name + " " + formatTime(event),
                date: event.date,
            };
        });
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={eventsForUser}
            eventContent={renderEventContent}
        />
    );
};

export default Calendar;
