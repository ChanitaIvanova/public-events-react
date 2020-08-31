import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../../types/GameEvent";
import withHeaderAndContentData from "../common/withHeaderAndContentData";
// eslint-disable-next-line no-unused-vars
import { HeaderData } from "../common/table.interfaces";
import EventActions from "./EventActions";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { formatTime } from "../../services/events.service";
import Table from "../common/Table";
import { useSelector } from "react-redux";

const MyEvents = () => {
    const events = useSelector((state: State) => state.eventsState.events);
    const loggedInUser = useSelector(
        (state: State) => state.userState.loggedInUser
    );
    const contentData = events
        .filter((event: GameEvent) => {
            return event.owner === loggedInUser?.id;
        })
        .map((event: any) => {
            return {
                ...event,
                "time:formatted": formatTime(event),
                actions: { component: EventActions, props: { event } },
            };
        });
    const headerData: HeaderData = {
        tableName: "My events",
        headers: [
            {
                key: "name",
                name: "Event Name",
            },
            {
                key: "game",
                name: "Game Name",
            },
            {
                key: "city",
                name: "City",
            },
            {
                key: "address",
                name: "Address",
            },
            {
                key: "date",
                name: "Date",
            },
            {
                key: "time:formatted",
                name: "Time",
            },
            {
                key: "slots",
                name: "Slots",
            },
            {
                key: "freeSlots",
                name: "Free Slots",
            },
            {
                key: "actions",
                name: "Actions",
                isComponent: true,
            },
        ],
    };

    return <Table headerData={headerData} contentData={contentData}></Table>;
};

// const mapStateToProps = ({ eventsState, userState }: State) => {
//     return {
//         contentData: eventsState.events
//             .filter((event: GameEvent) => {
//                 return event.owner === userState.loggedInUser?.id;
//             })
//             .map((event: any) => {
//                 return {
//                     ...event,
//                     "time:formatted": formatTime(event),
//                     actions: { component: EventActions, props: { event } },
//                 };
//             }),
//     };
// };

// const MyEvenets = connect(
//     mapStateToProps,
//     // eslint-disable-next-line comma-dangle
//     null
// )(withHeaderAndContentData(headerData)(Table));

export default MyEvents;
