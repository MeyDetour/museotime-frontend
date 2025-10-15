import "./style.css"
import {useEffect, useState} from "react";
import MuseumEtiquette from "../../components/museumEtiquette/museumEtiquette.jsx";

export default function MuseumsList() {
    const [museums, setMuseums] = useState([])
    useEffect(() => {
        async function getData() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museums", {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setMuseums(result);


        }

        if (museums.length === 0) {
            getData()
        }
    }, [])

    return <div className={"museumsList page"}>
        <div className="leftPanel">
            <h1>Répertoire des Musées de France : base Muséofile</h1>
            <h3>Filtrer par...</h3>
            <div>
                <h4>Localisation</h4>
                <div className={"inputCheckbox"}>
                    <input type="checkbox"/>
                    <span>Près de chez moi</span>
                </div>
            </div>
            <div>
                <h4>Protection</h4>
                <div className={"inputContainer"}>
                    <div className={"inputCheckbox"}>
                        <input type="checkbox"/>
                        <span>Protégé au titre des monuments historiques</span>
                    </div>
                    <div className={"inputCheckbox"}>
                        <input type="checkbox"/>
                        <span>BtuA</span>
                    </div>  <div className={"inputCheckbox"}>
                        <input type="checkbox"/>
                        <span>Inscrit au patrimoine mondial par UNESCO</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="etiquettesList">
            {museums.map((museum, index) => (
                <MuseumEtiquette museum={museum} key={index}></MuseumEtiquette>
            ))}
        </div>

    </div>;
}
