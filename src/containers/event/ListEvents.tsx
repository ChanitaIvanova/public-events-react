import React from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../../types/GameEvent";
import withHeaderAndContentData from "../common/withHeaderAndContentData";
// eslint-disable-next-line no-unused-vars
import { HeaderData } from "../common/table.interfaces";
import Table from "../common/Table";
import ReserveSlot from "./ReserveSlot";
import { State } from "../../reducers/initialState";
import { User } from "../../types/User";

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

const mapStateToProps = ({ events, userState }: State) => {
    return {
        contentData: events
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
