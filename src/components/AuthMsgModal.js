import '../assets/styles/WarningModal.css'
import {useEffect} from "react";
import {useAuth} from "../context/AuthContext";

function AuthMsgModal(props) {
    const {setCredential, setActionName, loading, setLoading, authMsg, setAuthMsg} = useAuth();

    useEffect(() => {
        window.addEventListener('click', removeModal);
        return () => {
            window.removeEventListener('click', removeModal);
        }
    }, []);

    function removeModal() {
        setCredential({});
        setAuthMsg('');
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