import { baseUrl } from "../config";
import {
    logOut,
    requestAddUser,
    requestAddUserSucess,
    requestAddUserFailed,
} from "../actions/user/UserActions";
// eslint-disable-next-line no-unused-vars
import { User } from "../types/User";
import cookie from "js-cookie";

export const addUser = (user: User) => {
    return fetch(baseUrl + "users", {
        method: "POST",
        body: JSON.stringify(user),
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
        .catch((error) => {
            console.error(error.message);
            return false;
        });
};

export const loginUser = (email: string, password: string) => {
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
            cookie.set("user-id", users[0].id);
            return users[0];
        })
        .catch((error) => {
            console.error(error.message);
            return null;
        });
};

export const getUser = () => {
    const userId = cookie.get("user-id");
    if (!userId) {
        return;
    }
    return fetch(baseUrl + "users/" + userId, {
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
        .then((user) => {
            if (!user) {
                const error = new Error("Error: No user was found");
                throw error;
            }
            return user;
        })
        .catch((error) => {
            console.error(error.message);
            return null;
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

export const removeEventForUser = (user: User, eventId: number) => {
    const updatedUser = {
        ...user,
        events: user.events.filter((event) => {
            return event !== eventId;
        }),
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

export const clearUser = () => (dispatch: any) => {
    cookie.remove("user-id");
    dispatch(logOut());
};
