// eslint-disable-next-line no-unused-vars
import React from "react";
import { formatTime } from "../../services/events.service";
import styles from "./EventInfo.module.scss";
import Modal from "../common/Modal";

const EventInfo = ({ event, handleClick }: any) => {
    if (!event) {
        return null;
    }
    return (
        <>
            <em
                className='waves-effect waves-light modal-trigger'
                data-target={"modal_" + event.id}
            >
                {event.name + " " + formatTime(event)}
            </em>
            <Modal
                id={event.id}
                title={event.name}
                handleClick={handleClick}
                submitButtonLabel={"Leave"}
                submitButtonClasess={"red lighten-2"}
            >
                <dl className={styles.definitionList}>
                    <dt>Game</dt>
                    <dd>{event.game}</dd>
                    <dt>City</dt>
                    <dd>{event.city}</dd>
                    <dt>Address</dt>
                    <dd>{event.address}</dd>
                    <dt>Date</dt>
                    <dd>{event.date}</dd>
                    <dt>Time</dt>
                    <dd>{formatTime(event)}</dd>
                </dl>
            </Modal>
        </>
    );
};

export default EventInfo;
