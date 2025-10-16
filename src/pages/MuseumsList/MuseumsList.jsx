import "./style.css"
import {useEffect, useState} from "react";
import MuseumEtiquette from "../../components/museumEtiquette/museumEtiquette.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {useUser} from "../../context/UserProvider.jsx";

export default function MuseumsList() {
    const [museums, setMuseums] = useState([])
    const [filters, setFilters] = useState([])
    const [limit, setLimit] = useState({
        "themes": 9,
        "domaine_thematique": 9,
        "departement": 9,
        "annee_creation": 9,
    })
    const [maxIndex, setMaxIndex] = useState(null)
    const [filtersChoosen, setFilterChoosen] = useState({})


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


        async function getFilters() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museum/get/filters", {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setFilters(result);

        }

        getFilters()
        getData();
    }, [limit])

    useEffect(
        ()=>{

            async function applyFilters() {

                const params = new URLSearchParams();

                Object.entries(filtersChoosen).forEach(([key, values]) => {
                    if (Array.isArray(values) && values.length > 0) {
                        values.forEach(v => params.append(key, v));
                    }
                });

                let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museum/apply/filters?"+ params.toString(), {
                    method: "POST",
                    body: JSON.stringify(filtersChoosen),
                })
                if (!jsonResponse.ok) {
                    throw new Error(`Response status: ${jsonResponse.status}`);
                }

                const result = await jsonResponse.json();
                console.log(result);
                setMuseums(result);
            }

            applyFilters();
        }
    ,[filtersChoosen])

    return <div className={"museumsList page"}>
        <div className="leftPanel">
            <h1>Répertoire des Musées de France : base Muséofile</h1>
            <h3>Filtrer par...</h3>

            {/* FILTRE LOCALISATION */}
            {/*<div>*/}
            {/*    <h4>Localisation</h4>*/}
            {/*    <div className={"inputCheckbox"}>*/}
            {/*        <input type="checkbox"/>*/}
            {/*        <span>Près de chez moi</span>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/* FILTRE SUR LA PROTECTION */}
            {/*<div>*/}
            {/*    <h4>Protection</h4>*/}
            {/*    <div className={"inputContainer"}>*/}
            {/*        <div className={"inputCheckbox"}>*/}
            {/*            <input type="checkbox"/>*/}
            {/*            <span>Protégé au titre des monuments historiques</span>*/}
            {/*        </div>*/}
            {/*        <div className={"inputCheckbox"}>*/}
            {/*            <input type="checkbox"/>*/}
            {/*            <span>BtuA</span>*/}
            {/*        </div>  <div className={"inputCheckbox"}>*/}
            {/*            <input type="checkbox"/>*/}
            {/*            <span>Inscrit au patrimoine mondial par UNESCO</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {filters && Object.keys(filters).length > 0 &&
                <div>
                    {[ "domaine_thematique", "themes","annee_creation", "departement"].map((category) => (
                        <div key={category} className="filter-section">
                            <h4>
                                {category === "themes" && "Thèmes"}
                                {category === "domaine_thematique" && "Domaines thématiques"}
                                {category === "annee_creation" && "Année de création"}
                                {category === "departement" && "Département"}
                            </h4>

                            {limit[category] === filters[category].length ?
                                <span className={"btn"}
                                    onClick={() => setLimit(prev => ({
                                        ...prev,
                                        [category]: 9
                                    }))}
                                >
                                    Fermer
                            </span>
                            :
                                <span className={"btn"}
                                    onClick={() => setLimit(prev => ({
                                        ...prev,
                                        [category]: filters[category].length
                                    }))}
                                >
                                Voir tous
                            </span>
                            }


                            <div className="wrapper">
                                {filters[category].map((item, i) => (
                                    limit[category] > i && (
                                        <div key={i} className="inputCheckbox">
                                            <input
                                                type="checkbox"
                                                onChange={(e) => {
                                                    setFilterChoosen(prev => {
                                                        const updated = {...prev};
                                                        if (e.target.checked) {
                                                            updated[category] = [...(updated[category] || []), item];
                                                        } else {
                                                            updated[category] = updated[category].filter(v => v !== item);
                                                        }
                                                        return updated;
                                                    });
                                                }}
                                            />
                                            <span>{item}</span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            }

        </div>
        <div className="etiquettesList">
            {museums.map((museum, index) => (
                <MuseumEtiquette museum={museum} key={index}></MuseumEtiquette>
            ))}
        </div>
        {limit < 101 && <button className={"button"} onClick={() => {
            setLimit(prev => prev + 20)
        }}>Voir plus</button>}


    </div>;
}
