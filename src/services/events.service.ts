import { baseUrl } from "../config";
import {
    addGameEvent,
    addGameEvents,
    editGameEvent,
    deleteGameEvent,
    requestAddGameEvent,
    requestAddGameEventSuccess,
    requestAddGameEventFailed,
} from "../actions/GameEventActions";
// eslint-disable-next-line no-unused-vars
import { GameEvent } from "../types/GameEvent";

export const addEvent = (event: GameEvent) => (dispatch: any) => {
    dispatch(requestAddGameEvent());
    return fetch(baseUrl + "events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                dispatch(requestAddGameEventSuccess());
                return response;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .then((response) => response.json())
        .then((event) => dispatch(addGameEvent(event)))
        .catch((error: Error) => {
            dispatch(requestAddGameEventFailed());
            console.error(error.message);
            return false;
        });
};

export const fetchEvents = () => (dispatch: any) => {
    return fetch(baseUrl + "events", {
        method: "GET",
    })
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .then((response) => response.json())
        .then((events) => dispatch(addGameEvents(events)))
        .catch((error: Error) => {
            console.error(error.message);
            return false;
        });
};

export const reserveGameSlot = (event: GameEvent) => {
    const gameEvent = { ...event, freeSlots: event.freeSlots - 1 };
    return fetch(baseUrl + "events/" + event.id, {
        method: "PUT",
        body: JSON.stringify(gameEvent),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return true;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .catch((error: Error) => {
            console.error(error.message);
            return false;
        });
};

export const updateGameEvent = (gameEvent: GameEvent) => (dispatch: any) => {
    return fetch(baseUrl + "events/" + gameEvent.id, {
        method: "PUT",
        body: JSON.stringify(gameEvent),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                dispatch(editGameEvent(gameEvent));
                return true;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .catch((error: Error) => {
            console.error(error.message);
            return false;
        });
};

export const removeGameEvent = (eventId: number) => (dispatch: any) => {
    return fetch(baseUrl + "events/" + eventId, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                dispatch(deleteGameEvent(eventId));
                return true;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .catch((error: Error) => {
            console.error(error.message);
            return false;
        });
};

export const formatTime = (event: GameEvent): string => {
    let formattedTime = "";
    if (event.time) {
        let minutes = event.time % 3600;
        const hours = (event.time - minutes) / 3600;
        minutes = minutes / 60;
        formattedTime =
            (hours < 10 ? "0" + hours : hours) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes);
    }

    return formattedTime;
};
