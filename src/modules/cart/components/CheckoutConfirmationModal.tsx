import 'modules/cart/styles/CheckoutConfirmationModal.css'
import {FC, MouseEvent} from "react";

type ClickHandler = (event: MouseEvent<HTMLButtonElement>) => void;

const CheckoutConfirmationModal: FC<{onClose:ClickHandler}> = (props): JSX.Element => {
    function getTodayDate() {
        let date = new Date();
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }

    return (
        <div className="modal">
            <div className="modal-content-container">
                <div className="flex-container">
                    <div>
                        <h1 className="title">Thank you.</h1>
                        <h3>Your order was completed successfully.</h3>
                        <div className="flex-container">
                            <table className="order-info-table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Delivery (Max)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{getTodayDate()}</td>
                                    <td>7 days</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="modal-close-button" onClick={props.onClose}>CLOSE</button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutConfirmationModal;