import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../../types/GameEvent";
import withHeaderAndContentData from "../common/withHeaderAndContentData";
// eslint-disable-next-line no-unused-vars
import { HeaderData } from "../common/table.interfaces";
import Table from "../common/Table";
import DeleteEvent from "../event/DeleteEvent";

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

const mapStateToProps = ({ events }: any) => {
    return {
        contentData: events
            .filter((event: GameEvent) => {
                return event.freeSlots > 0;
            })
            .map((event: any) => {
                return {
                    ...event,
                    actions: <DeleteEvent eventId={event.id}></DeleteEvent>,
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
