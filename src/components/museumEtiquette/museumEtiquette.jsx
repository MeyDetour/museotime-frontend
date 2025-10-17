import "./style.css"
import {Link} from "react-router";

export default function MuseumEtiquette({museum, type, callback, share}) {
    return <Link to={"/museum/" + museum.id} className={"museumEtiquette "}>
        <img src={museum.image ?? "/defaultMuseumImage.png"} alt=""/>
        <h4>{museum.nom_officiel}</h4>

        {/* Util Dans la page List et Partage */}
        {type === "share" && (
            <span>Shared by {share.sender} ({share.createdAt})</span>
        )}

        {/* Util Dans la page List et Partage */}
        {(type === "favoris" || type === "share") &&
            <img onClick={(e) => {
                e.preventDefault(); // empêche le <Link> de naviguer
                callback();
            }} id={"iconDelete"} src="/icon/delete.png" alt=""/>
        }
    </Link>;
}
