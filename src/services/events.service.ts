import { baseUrl } from "../config";
import {
    addGameEvent,
    addGameEvents,
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

// export const loginUser = (email: string, password: string) => (
//     dispatch: any
// ) => {
//     dispatch(requestLogInUser());
//     const searchUrl =
//         baseUrl +
//         "users?email=" +
//         encodeURIComponent(email) +
//         "&password=" +
//         encodeURIComponent(password);
//     return fetch(searchUrl, {
//         method: "GET",
//     })
//         .then((response) => {
//             if (response.ok) {
//                 dispatch(requestAddUserSucess());
//                 return response;
//             } else {
//                 const error = new Error(
//                     "Error " + response.status + ": " + response.statusText
//                 );
//                 throw error;
//             }
//         })
//         .then((response) => response.json())
//         .then((users) => {
//             if (!users || users.length === 0) {
//                 const error = new Error("Error: No user was found");
//                 throw error;
//             }
//             return dispatch(logIn(users[0]));
//         })
//         .catch((error) => {
//             dispatch(requestAddUserFailed());
//             console.error(error.message);
//             return false;
//         });
// };
