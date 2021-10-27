import '../styles/AuthResultModal.css'
import {useEffect, FC} from "react";
import {useAuth} from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";


const AuthResultModal: FC<{msg:string}> = (props): JSX.Element => {
    const {authorized, setShowAuthResultModal} = useAuth();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('click', onRemoveModal);
        return () => {
            window.removeEventListener('click', onRemoveModal);
        }
    }, []);

    function onRemoveModal() {
        setShowAuthResultModal(false);
        goToHome();
    }

    function goToHome() {
        if(authorized) {
            history.push(`${process.env.PUBLIC_URL}/`);
        }
    }

    return (
        <div className="modal">
            <div className="modal-content-container">
                <div className="flex-container">
                    <div>
                        <h2>{props.msg}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthResultModal;