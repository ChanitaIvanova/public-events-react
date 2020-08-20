// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import M from "materialize-css";
import styles from "./Modal.module.scss";
import classNames from "classnames";

const Modal = ({
    children,
    id,
    title,
    handleClick,
    cancelButtonLabel,
    submitButtonLabel,
    submitButtonClasess,
}: any) => {
    cancelButtonLabel = cancelButtonLabel ? cancelButtonLabel : "Cancel";
    submitButtonLabel = submitButtonLabel ? submitButtonLabel : "Submit";
    submitButtonClasess = submitButtonClasess ? submitButtonClasess : "";
    let modal: any;
    useEffect(() => {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: true,
            startingTop: "4%",
            endingTop: "10%",
        };
        // eslint-disable-next-line
        M.Modal.init(modal, options);
    }, [modal]);

    return (
        <>
            <div
                ref={(Modal) => {
                    modal = Modal;
                }}
                id={"modal_" + id}
                className='modal'
            >
                <div
                    className={classNames("modal-content", styles.modalContent)}
                >
                    <h2>{title}</h2>
                    {children}
                </div>
                <div className='modal-footer'>
                    <button className='modal-close waves-effect waves-red btn-flat'>
                        {cancelButtonLabel}
                    </button>
                    <button
                        onClick={handleClick}
                        className={classNames(
                            "modal-close waves-effect waves-light btn",
                            submitButtonClasess
                        )}
                    >
                        {submitButtonLabel}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Modal;
