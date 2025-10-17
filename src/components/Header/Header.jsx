import "./style.css"
import {Link} from "react-router";
import {useUser} from "../../context/UserProvider.jsx";

export default function Header() {
    const pathname = window.location.pathname
    const {user} = useUser()
    return <div className={"header "}>
        <ul>
            <li className={pathname.startsWith("/museum") ? "focus" : ""}><Link to={"museums"}>Museums</Link></li>



            {user ?
                <>
                    <li className={pathname === "favoriteList" ? "focus" : ""}><Link to={"favoriteList"}>Favorites
                        d'envie</Link>
                    </li>
                    <li className={pathname === "profil" ? "focus" : ""}><Link to={"profil"}>Profil</Link></li>

                </>
                :
                <li className={pathname === "registerLoginPage" ? "focus" : ""}><Link to={"registerLoginPage"}>Login</Link></li>
            }

        </ul>
    </div>
        ;
}
