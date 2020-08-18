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

const mapStateToProps = ({ events, userState }: any) => {
    return {
        contentData: events
            .filter((event: GameEvent) => {
                return event.owner === userState.loggedInUser.id;
            })
            .map((event: any) => {
                return {
                    ...event,
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
