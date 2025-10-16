import "./style.css"
import {Link, useLocation} from "react-router";
import {useEffect, useState} from "react";

export default function Footer() {
    const location = useLocation(); // réactif
    const [additionalClass, setAdditionalClass] = useState("");

    useEffect(() => {
        const pathname = location.pathname;

        if (pathname === "/museums") {
            setAdditionalClass("museumFooter");
        } else if (pathname.startsWith("/museum/")) {
            setAdditionalClass("greyFooter");
        } else if (pathname.startsWith("/registerLoginPage")) {
            setAdditionalClass("registerLoginFooter");
        } else {
            setAdditionalClass("");
        }
    }, [location.pathname]);


    return <footer className={"footer-container "+additionalClass}>
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
