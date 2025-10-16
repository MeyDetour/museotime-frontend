import "./style.css"
import {useEffect, useState} from "react";
import MuseumEtiquette from "../../components/museumEtiquette/museumEtiquette.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useUser} from "../../context/UserProvider.jsx";

export default function MuseumsList() {
    const [museums, setMuseums] = useState([])
    const [limit, setLimit] = useState(20)
    useEffect(() => {
        async function getData() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museums" + (limit && "?limit=" + limit), {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setMuseums(result);
            console.log(result);
        }
        getData();
    }, [limit])


    return <div className={"museumsList page"}>
        <div className="leftPanel">
            <h1>Répertoire des Musées de France : base Muséofile</h1>
            <h3>Filtrer par...</h3>
            {/*<div>*/}
            {/*    <h4>Localisation</h4>*/}
            {/*    <div className={"inputCheckbox"}>*/}
            {/*        <input type="checkbox"/>*/}
            {/*        <span>Près de chez moi</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
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
        {limit < 101 && <button className={"button"} onClick={()=>{setLimit(prev=>prev+20)}}>Voir plus</button>}


    </div>;
}
