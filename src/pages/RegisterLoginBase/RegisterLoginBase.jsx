import "./style.css"
import {Link, Outlet} from "react-router";

export default function RegisterLoginBase() {
    return <div className={"registerLoginBase page"}>
        <Outlet />
        <span>MuséoTime</span>
    </div>;
}
