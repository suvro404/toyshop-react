import { useHistory } from "react-router-dom";
import "modules/common/styles/ErrorFallback.css";

function ErrorFallback() {
    const history = useHistory();

    function changeRoute(route:string) {
        history.push(route);
    }

    return (
        <div className="error-fallback-container flex-container">
            <div className="">
                <h3 className="error-fallback-msg">Sorry, page is not loading!</h3>
                <button className="error-fallback-btn" onClick={() => changeRoute("/")}>
                    BACK
                </button>
            </div>
        </div>
    );
}

export default ErrorFallback;