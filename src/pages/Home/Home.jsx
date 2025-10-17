import "./style.css"
import {Link} from "react-router";

export default function Home() {

    return <div className={"home page"}>
        <h1>MuséoTime</h1>
        <p>Découvrez MuseoTime, votre portail incontournable des musées de France ! Connectez-vous pour partager vos
            coups de cœur avec vos amis, créer des listes de favoris personnalisées, et profitez pleinement de l'offre
            culturelle française.</p>

        <Link to={"museums"}>
            <img src="/homePageMuseums.png" alt=""/>
        </Link>

        <p>Ce projet repose sur une architecture full-stack : un backend Symfony et un frontend React. Les données sont
            fournies par l'API officielle de data.culture.gouv.fr. La documentation de l'API est disponible ici <a
                href="museotime-backend.meydetour.com">sur ce lien</a>.</p>

    </div>;
}
