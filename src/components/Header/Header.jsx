import "./style.css"
import {Link} from "react-router";
import {useUser} from "../../context/UserProvider.jsx";

export default function Header() {
    const pathname = window.location.pathname
    const {user} = useUser()
    console.log(pathname)
    return <div className={"header "}>
        <ul>
            <li className={pathname.startsWith("/museum") ? "focus" : ""}><Link to={"museums"}>Musées</Link></li>
            {user ?
                <>
                    <li className={pathname === "favoriteList" ? "focus" : ""}><Link to={"favoriteList"}>Liste
                        d'envie</Link>
                    </li>
                    <li className={pathname === "profil" ? "focus" : ""}><Link to={"museums"}>Profil</Link></li>

                </>
                :
                <li className={pathname === "registerLoginPage" ? "focus" : ""}><Link to={"registerLoginPage"}>Connexion</Link></li>
            }
        </ul>
    </div>
        ;
}
