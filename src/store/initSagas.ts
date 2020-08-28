import * as sagas from "../sagas/index";

export const initSagas = (sagaMiddleware: any) => {
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
