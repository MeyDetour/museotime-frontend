import "./style.css"

export default function MuseumEtiquette({museum,type}) {
    return <div className={"museumEtiquette "}>
        <img src={museum.image ?? "/defaultMuseumImage.png"} alt=""/>
        <h4>{museum.nom_officiel}</h4>
    </div>;
}
