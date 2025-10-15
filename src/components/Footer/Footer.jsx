import "./style.css"
import {Link} from "react-router";

export default function Footer() {
    const pathname =window.location.pathname

    let additionnalClass = ""
    switch (pathname) {
        case "/museums":
            additionnalClass = "greyFooter";
            break;
    }
    if (pathname === "/museums") {
        return null
    }
    return <footer className={"footer-container "+additionnalClass}>
        <div className="footer">


            <span>MuséoTime</span>
            <div>
                <ul>
                    <li><h4>Contact</h4></li>
                    <li>
                        <Link rel="stylesheet" to="mailto:contact@meydetour.com">
                            contact@meydetour.com
                        </Link>
                    </li>
                    <li>
                        <Link rel="stylesheet" to="tel:0782408049">
                            07 82 40 80 49
                        </Link>
                    </li>
                    <li>
                        <Link rel="stylesheet" to="mentionslegales">
                            Mentions légales
                        </Link>
                    </li>
                </ul>

                <ul>
                    <li>
                        <h4>Pages du site</h4>
                    </li>
                    <li>
                        <Link rel="stylesheet" to="museums">
                            Musées
                        </Link>
                    </li>
                    <li>
                        <Link rel="stylesheet" to="profil">
                            Profil
                        </Link>
                    </li>
                    <li>
                        <Link rel="stylesheet" to="favoriteList">
                            List d'envie
                        </Link>
                    </li>


                </ul>
            </div>
        </div>
    </footer>
        ;
}
