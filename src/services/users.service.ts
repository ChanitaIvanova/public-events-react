import { baseUrl } from "../config";
import {
    logIn,
    requestAddUser,
    requestAddUserSucess,
    requestAddUserFailed,
    requestLogInUser,
} from "../actions/user/UserActions";
// eslint-disable-next-line no-unused-vars
import { User } from "../types/User";

export const addUser = (user: User) => (dispatch: any) => {
    dispatch(requestAddUser());
    return fetch(baseUrl + "users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                dispatch(requestAddUserSucess());
                return true;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .catch((error) => {
            dispatch(requestAddUserFailed());
            console.error(error.message);
            return false;
        });
};

export const loginUser = (email: string, password: string) => (
    dispatch: any
) => {
    dispatch(requestLogInUser());
    const searchUrl =
        baseUrl +
        "users?email=" +
        encodeURIComponent(email) +
        "&password=" +
        encodeURIComponent(password);
    return fetch(searchUrl, {
        method: "GET",
    })
        .then((response) => {
            if (response.ok) {
                dispatch(requestAddUserSucess());
                return response;
            } else {
                const error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                throw error;
            }
        })
        .then((response) => response.json())
        .then((users) => {
            if (!users || users.length === 0) {
                const error = new Error("Error: No user was found");
                throw error;
            }
            return dispatch(logIn(users[0]));
        })
        .catch((error) => {
            dispatch(requestAddUserFailed());
            console.error(error.message);
            return false;
        });
};

export const addEventForUser = (user: User, eventId: number) => {
    const updatedUser = {
        ...user,
        events: [...user.events, eventId],
    };
    return fetch(baseUrl + "users/" + updatedUser.id, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
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
