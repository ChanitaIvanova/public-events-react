import { fetchEvents } from "../services/events.service";
import { put, call } from "redux-saga/effects";
import {
    addGameEvents,
    requestGameEventData,
    gameEeventDataRetrieved,
} from "../actions/GameEventActions";

/**
 * Retrives all events from the backend and saves them in the state
 */
export function* fetchEventsGen() {
    yield put(requestGameEventData());
    const events = yield call(fetchEvents);
    if (events) {
        yield put(addGameEvents(events));
    }

    yield put(gameEeventDataRetrieved());
}
