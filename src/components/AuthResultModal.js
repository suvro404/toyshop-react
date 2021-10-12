import '../assets/styles/WarningModal.css'
import {useEffect} from "react";
import {useAuth} from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function AuthMsgModal(props) {
    const {authorized, setCredential, setAuthMsg} = useAuth();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('click', onRemoveModal);
        return () => {
            window.removeEventListener('click', onRemoveModal);
        }
    }, []);

    function onRemoveModal() {
        setCredential({});
        setAuthMsg('');
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

export default AuthMsgModal;