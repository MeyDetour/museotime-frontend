import "./style.css"
import {Link} from "react-router";

export default function Header() {
    const pathname =window.location.pathname
    console.log(pathname)
    return <div className={"header "}>
        <ul>
            <li className={ pathname.startsWith("/museum") ? "focus":""}><Link to={"museums"}>Musées</Link></li>
            <li className={ pathname === "favoriteList"  ? "focus":""}><Link to={"favoriteList"}>Liste d'envie</Link></li>
            <li className={ pathname === "profil"  ? "focus":""}><Link to={"museums"}>Profil</Link></li>
        </ul>
    </div>;
}
