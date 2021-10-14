import '../assets/styles/WarningModal.css'
import {FC, MouseEvent} from "react";

type ClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;

const WarningModal: FC<{onClose:ClickHandler}> = (props): JSX.Element => {
    return (
        <div className="modal">
            <div className="modal-content-container">
                <div className="flex-container">
                    <div>
                        <h2>Please Log In to continue.</h2>
                        <div>
                            <button className="modal-close-button" onClick={props.onClose}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarningModal;