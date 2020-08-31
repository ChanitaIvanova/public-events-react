import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../../types/GameEvent";
import withHeaderAndContentData from "../common/withHeaderAndContentData";
// eslint-disable-next-line no-unused-vars
import { HeaderData } from "../common/table.interfaces";
import Table from "../common/Table";
import ReserveSlot from "./ReserveSlot";
// eslint-disable-next-line no-unused-vars
import { State } from "../../reducers/initialState";
import { formatTime } from "../../services/events.service";

const headerData: HeaderData = {
    tableName: "Available events",
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

const mapStateToProps = ({ eventsState, userState }: State) => {
    return {
        contentData: eventsState.events
            .filter((event: GameEvent) => {
                const userEvent = userState.loggedInUser?.events.find(
                    (id: number) => {
                        return id === event.id;
                    }
                );
                return event.freeSlots > 0 && typeof userEvent === "undefined";
            })
            .map((event: any) => {
                return {
                    ...event,
                    "time:formatted": formatTime(event),
                    actions: (
                        <div>
                            <ReserveSlot
                                event={event}
                                user={userState.loggedInUser}
                            ></ReserveSlot>
                        </div>
                    ),
                };
            }),
    };
};

const ListEvenets = connect(
    mapStateToProps,
    // eslint-disable-next-line comma-dangle
    null
)(withHeaderAndContentData(headerData)(Table));

export default ListEvenets;
