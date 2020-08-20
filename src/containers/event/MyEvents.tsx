import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../../types/GameEvent";
import withHeaderAndContentData from "../common/withHeaderAndContentData";
// eslint-disable-next-line no-unused-vars
import { HeaderData } from "../common/table.interfaces";
import Table from "../common/Table";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { formatTime } from "../../services/events.service";

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
        },
    ],
};

const mapStateToProps = ({ events, userState }: State) => {
    return {
        contentData: events
            .filter((event: GameEvent) => {
                return event.owner === userState.loggedInUser?.id;
            })
            .map((event: any) => {
                return {
                    ...event,
                    "time:formatted": formatTime(event),
                    actions: (
                        <div>
                            <DeleteEvent eventId={event.id}></DeleteEvent>
                            <EditEvent event={event}></EditEvent>
                        </div>
                    ),
                };
            }),
    };
};

const MyEvenets = connect(
    mapStateToProps,
    // eslint-disable-next-line comma-dangle
    null
)(withHeaderAndContentData(headerData)(Table));

export default MyEvenets;
