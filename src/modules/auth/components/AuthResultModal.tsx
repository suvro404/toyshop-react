import 'modules/auth/styles/AuthResultModal.css'
import {useEffect, FC} from "react";
import { useHistory } from "react-router-dom";
import {useAuth} from "modules/auth/contexts/AuthContext";

const AuthResultModal: FC<{msg:string}> = (props): JSX.Element => {
    const {authorized, setShowAuthResultModal} = useAuth();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('click', onRemoveModal);
        return () => {
            window.removeEventListener('click', onRemoveModal);
        }
    });

    function onRemoveModal() {
        setShowAuthResultModal(false);
        goToHome();
    }

    function goToHome() {
        if(authorized) {
            history.push('/');
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