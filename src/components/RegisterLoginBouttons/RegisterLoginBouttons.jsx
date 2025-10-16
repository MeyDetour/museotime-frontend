import "./style.css"
import {Link} from "react-router";

export default function RegisterLoginBouttons() {
    return    <div className={"buttonContainer"}>
            <Link to="/registerLoginPage/login">
                <svg width="53" height="107" viewBox="0 0 53 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8296 29.3358L15.5157 24.61L41.0396 50.3658C41.451 50.7785 41.7776 51.2692 42.0004 51.8098C42.2232 52.3504 42.3379 52.9301 42.3379 53.5156C42.3379 54.1011 42.2232 54.6808 42.0004 55.2214C41.7776 55.7619 41.451 56.2527 41.0396 56.6654L15.5157 82.4346L10.834 77.7087L34.79 53.5223L10.8296 29.3358Z"
                        fill="black" style={{fill:'black',fillOpacity:1}}/>
                </svg>
                <span>Login</span></Link>
            <Link to="/registerLoginPage/register">
                <svg width="53" height="107" viewBox="0 0 53 107" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8296 29.3358L15.5157 24.61L41.0396 50.3658C41.451 50.7785 41.7776 51.2692 42.0004 51.8098C42.2232 52.3504 42.3379 52.9301 42.3379 53.5156C42.3379 54.1011 42.2232 54.6808 42.0004 55.2214C41.7776 55.7619 41.451 56.2527 41.0396 56.6654L15.5157 82.4346L10.834 77.7087L34.79 53.5223L10.8296 29.3358Z"
                        fill="black" style={{fill:'black',fillOpacity:1}}/>
                </svg>
                <span>Register</span></Link>
        </div>
  ;
}
