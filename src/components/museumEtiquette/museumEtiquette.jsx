import "./style.css"
import {Link} from "react-router";

export default function MuseumEtiquette({museum,type}) {
    return <Link to={"/museum/"+museum.id} className={"museumEtiquette "}>
        <img src={museum.image ?? "/defaultMuseumImage.png"} alt=""/>
        <h4>{museum.nom_officiel}</h4>
    </Link>;
}
