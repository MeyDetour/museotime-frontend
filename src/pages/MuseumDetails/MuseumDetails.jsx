import "./style.css"
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import MuseumMap from "../../components/Map/Map.jsx";

export default function MuseumDetails() {
    const {id} = useParams();
    const [museum, setMuseum] = useState(null)
    const [liked,setLiked] = useState(null)
    useEffect(() => {
        async function getData() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museum/" + id, {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setMuseum(result);
            console.log(result);


        }

        if (!museum) {
            getData()
        }
    }, [])


    return <div className={"museumDetails page"}>
        {!museum ?
            <span>Loading...</span>
            :
            <>

                <div className="leftData">
                    <div className="container ">
                        {museum.region && museum.region != "" &&
                            <div className="elt">
                                <h3>Région</h3>
                                <span>{museum.region}</span>
                            </div>
                        }
                        {museum.departement && museum.departement != "" &&
                            <div className="elt">
                                <h3>Département</h3>
                                <span>{museum.departement}</span>
                            </div>
                        }
                        {museum.annee_creation && museum.annee_creation != "" &&
                            <div className="elt">
                                <h3>Année de création</h3>
                                <span>{museum.annee_creation}</span>
                            </div>
                        }
                        {museum.categorie && museum.categorie != "" &&
                            <div className="elt">
                                <h3>Catégorie</h3>
                                <span>{museum.categorie}</span>
                            </div>
                        }
                        {museum.personnage_phare && museum.personnage_phare != "" &&
                            <div className="elt">
                                <h3>Personnage Phare</h3>
                                <span>{museum.personnage_phare}</span>
                            </div>
                        }
                        {museum.protection_batiment && museum.protection_batiment != "" &&
                            <div className="elt">
                                <h3>Personnage Phare</h3>
                                <span>{museum.protection_batiment.split("http")[0].trim().replace(/[:\s]+$/, "")}</span>
                            </div>
                        }

                    </div>
                    {museum.domaine_thematique && museum.domaine_thematique.length > 0 &&
                        <div className="container">
                            <h3>Domaine thématique</h3>
                            <div className={"wrapList"}>
                                {museum.domaine_thematique.map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </div>
                        </div>
                    }
                    {museum.themes && museum.themes.length > 0 &&
                        <div className="container">
                            <h3>Themes</h3>
                            <div className={"wrapList"}>
                                {museum.themes.map((theme, index) => (
                                    <span key={index}>{theme}</span>
                                ))}
                            </div>
                        </div>
                    } {museum.artiste && museum.artiste.length > 0 &&
                    <div className="container">
                        <h3>Artistes</h3>
                        <div className={"wrapList"}>
                            {museum.artiste.map((artiste, index) => (
                                <span key={index}>{artiste}</span>
                            ))}
                        </div>
                    </div>
                }
                    {museum.personnage_phare && museum.personnage_phare.length > 0 &&
                        <div className="container">
                            <h3>Personnages</h3>
                            <div className={"wrapList"}>
                                {museum.personnage_phare.map((pp, index) => (
                                    <span key={index}>{pp}</span>
                                ))}
                            </div>
                        </div>
                    }

                </div>
                <div className="rightData">

                    {/* IMAGE */}
                    <div className="imgContainer">
                        <div className={"iconContainer"}>
                            {/* HEART */}
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.83 16.8437C5.28634 16.3037 4.85559 15.6608 4.56287 14.9526C4.27015 14.2444 4.1213 13.485 4.125 12.7187C4.125 11.1689 4.74068 9.68251 5.83659 8.58659C6.93251 7.49067 8.41889 6.87499 9.96875 6.87499C12.1412 6.87499 14.0387 8.05749 15.0425 9.81749H16.5825C17.0928 8.92245 17.8311 8.17862 18.7224 7.66174C19.6137 7.14486 20.626 6.8734 21.6562 6.87499C23.2061 6.87499 24.6925 7.49067 25.7884 8.58659C26.8843 9.68251 27.5 11.1689 27.5 12.7187C27.5 14.3275 26.8125 15.8125 25.795 16.8437L15.8125 26.8125L5.83 16.8437ZM26.7575 17.82C28.0637 16.5 28.875 14.7125 28.875 12.7187C28.875 10.8042 28.1145 8.9681 26.7607 7.61432C25.4069 6.26054 23.5708 5.49999 21.6562 5.49999C19.25 5.49999 17.1187 6.66874 15.8125 8.48374C15.1458 7.55768 14.2678 6.80393 13.2515 6.28502C12.2352 5.76611 11.1099 5.49699 9.96875 5.49999C8.05422 5.49999 6.2181 6.26054 4.86432 7.61432C3.51054 8.9681 2.75 10.8042 2.75 12.7187C2.75 14.7125 3.56125 16.5 4.8675 17.82L15.8125 28.765L26.7575 17.82Z" fill="white" style={{fill: "white", fillOpacity: 1}}/>
                            </svg>

                            {/* SHARE */}
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.8388 28.875C21.9276 28.875 21.1544 28.5565 20.5191 27.9194C19.8848 27.2814 19.5676 26.5068 19.5676 25.5956C19.5676 25.4581 19.6281 25.1112 19.7491 24.5548L9.85325 18.6794C9.55625 19.0222 9.19279 19.2913 8.76288 19.4865C8.33296 19.6818 7.87142 19.7794 7.37825 19.7794C6.47442 19.7794 5.70625 19.4576 5.07375 18.8141C4.44125 18.1706 4.125 17.3993 4.125 16.5C4.125 15.6007 4.44125 14.8294 5.07375 14.1859C5.70625 13.5424 6.47442 13.2206 7.37825 13.2206C7.8705 13.2206 8.33204 13.3182 8.76288 13.5135C9.19371 13.7087 9.55717 13.9783 9.85325 14.322L19.7505 8.47137C19.6863 8.29354 19.64 8.11708 19.6116 7.942C19.5823 7.766 19.5676 7.58633 19.5676 7.403C19.5676 6.49275 19.8871 5.71862 20.526 5.08062C21.1649 4.44354 21.9404 4.125 22.8525 4.125C23.7646 4.125 24.5382 4.44446 25.1735 5.08338C25.8088 5.72229 26.1259 6.49779 26.125 7.40987C26.1241 8.32196 25.8055 9.09563 25.1694 9.73088C24.5332 10.3661 23.7586 10.6833 22.8456 10.6824C22.3488 10.6824 21.8905 10.5806 21.4706 10.3771C21.0508 10.1736 20.6933 9.9 20.3981 9.55625L10.4995 15.4316C10.5637 15.6095 10.61 15.7864 10.6384 15.9624C10.6677 16.1375 10.6824 16.3167 10.6824 16.5C10.6824 16.6833 10.6677 16.8625 10.6384 17.0376C10.609 17.2127 10.5632 17.3896 10.5009 17.5684L20.3981 23.4437C20.6942 23.1 21.0517 22.8264 21.4706 22.6229C21.8905 22.4194 22.3488 22.3176 22.8456 22.3176C23.7568 22.3176 24.5314 22.6366 25.1694 23.2746C25.8065 23.9145 26.125 24.6904 26.125 25.6025C26.125 26.5146 25.8055 27.2882 25.1666 27.9235C24.5277 28.5588 23.7508 28.8759 22.8388 28.875ZM22.8456 27.5C23.3855 27.5 23.8379 27.3176 24.2027 26.9527C24.5676 26.5879 24.75 26.136 24.75 25.597C24.75 25.058 24.5676 24.6056 24.2027 24.2399C23.8379 23.8741 23.386 23.6917 22.847 23.6926C22.308 23.6935 21.8556 23.876 21.4899 24.2399C21.1241 24.6038 20.9417 25.0557 20.9426 25.5956C20.9435 26.1355 21.126 26.5879 21.4899 26.9527C21.8538 27.3176 22.3048 27.5 22.8456 27.5ZM7.37825 18.403C7.92458 18.403 8.38292 18.2206 8.75325 17.8558C9.12267 17.4909 9.30737 17.039 9.30737 16.5C9.30737 15.961 9.12267 15.5091 8.75325 15.1442C8.38383 14.7794 7.9255 14.597 7.37825 14.597C6.84567 14.597 6.39971 14.7794 6.04038 15.1442C5.68104 15.5091 5.50092 15.961 5.5 16.5C5.49908 17.039 5.67921 17.4914 6.04038 17.8571C6.40154 18.2229 6.8475 18.4048 7.37825 18.403ZM22.847 9.30737C23.386 9.30737 23.8379 9.12496 24.2027 8.76012C24.5676 8.39529 24.75 7.94292 24.75 7.403C24.75 6.86308 24.5676 6.41117 24.2027 6.04725C23.8379 5.68333 23.386 5.50092 22.847 5.5C22.308 5.49908 21.8556 5.6815 21.4899 6.04725C21.1241 6.413 20.9417 6.86538 20.9426 7.40438C20.9435 7.94338 21.126 8.39529 21.4899 8.76012C21.8538 9.12496 22.3062 9.30737 22.847 9.30737Z" fill="white" style={{fill: "white", fillOpacity: 1}}/>
                            </svg>


                            {/* CLOSE */}
                            <Link to={"museums"}>
                                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.80016 25.1735L7.82666 24.2L15.5267 16.5L7.82666 8.80001L8.80016 7.82651L16.5002 15.5265L24.2002 7.82651L25.1737 8.80001L17.4737 16.5L25.1737 24.2L24.2002 25.1735L16.5002 17.4735L8.80016 25.1735Z" fill="white" style={{fill: "white", fillOpacity: 1}}/>
                                </svg>

                            </Link>


                        </div>
                        <img src={museum.image ?? "/defaultMuseumImage.png"} alt=""/>
                    </div>


                    <div className={"content"}>
                        {/* TEXT */}
                        <h1>{museum.nom_officiel}</h1>
                        <p>{museum.histoire}</p>
                        <p><b>Atouts : </b>{museum.atout}</p>
                        <p><b>Interet : </b>{museum.interet}</p>
                        {museum.protection_batiment &&
                            <span className={"greenEtiquettes"}>{museum.protection_batiment.split("http")[0].trim().replace(/[:\s]+$/, "")}</span>}


                        <div className="rowMap">

                            {/* MAP */}
                            <MuseumMap lon={museum.coordonnees.lon} lat={museum.coordonnees.lat}></MuseumMap>

                            {/* SITE INTERNET, TELEPHONE  */}
                            <div className={"data"}>

                                {/* LOCALISATION */}
                                <p>{museum.lieu && museum.lieu + ":"}{museum.adresse}, {museum.ville} {museum.code_postal} </p>

                                {/* SITE WEB */}
                                {museum.url && museum.url !== "" &&
                                    <a href={"https://" + museum.url} className={"grey"}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.7289 4.38402C17.1629 2.94402 19.2609 2.91402 20.4219 4.08002C21.5859 5.24802 21.5549 7.36002 20.1189 8.80002L17.6959 11.233C17.5595 11.3747 17.4842 11.5642 17.4862 11.7609C17.4881 11.9575 17.5673 12.1455 17.7065 12.2844C17.8458 12.4233 18.034 12.5019 18.2307 12.5033C18.4273 12.5047 18.6167 12.4288 18.7579 12.292L21.1819 9.85902C23.0929 7.94002 23.3329 4.87702 21.4849 3.02102C19.6349 1.16402 16.5779 1.40602 14.6649 3.32502L9.81895 8.19202C7.90795 10.111 7.66795 13.174 9.51595 15.029C9.58497 15.1008 9.66759 15.1581 9.759 15.1976C9.8504 15.2371 9.94876 15.258 10.0483 15.2591C10.1479 15.2602 10.2467 15.2415 10.3389 15.204C10.4312 15.1665 10.5151 15.111 10.5856 15.0407C10.6562 14.9705 10.7121 14.8869 10.75 14.7948C10.788 14.7028 10.8072 14.6041 10.8065 14.5045C10.8059 14.4049 10.7855 14.3064 10.7464 14.2149C10.7073 14.1233 10.6504 14.0404 10.5789 13.971C9.41495 12.803 9.44695 10.691 10.8819 9.25102L15.7289 4.38402Z"
                                                fill="white" style={{fill: "white", fillOpacity: 1}}/>
                                            <path
                                                d="M14.485 9.96998C14.3444 9.82902 14.1536 9.74967 13.9545 9.74939C13.7555 9.74911 13.5644 9.82792 13.4235 9.96848C13.2825 10.109 13.2032 10.2999 13.2029 10.4989C13.2026 10.698 13.2814 10.889 13.422 11.03C14.586 12.198 14.555 14.309 13.119 15.75L8.27197 20.616C6.83697 22.056 4.73897 22.086 3.57797 20.92C2.41397 19.752 2.44597 17.64 3.88097 16.2L6.30497 13.767C6.37451 13.6972 6.42961 13.6144 6.46714 13.5233C6.50467 13.4322 6.5239 13.3346 6.52371 13.2361C6.52353 13.1375 6.50394 13.04 6.46606 12.9491C6.42819 12.8581 6.37277 12.7755 6.30297 12.706C6.23317 12.6364 6.15036 12.5813 6.05927 12.5438C5.96817 12.5063 5.87058 12.4871 5.77206 12.4872C5.67353 12.4874 5.57601 12.507 5.48506 12.5449C5.39411 12.5828 5.31151 12.6382 5.24197 12.708L2.81797 15.141C0.906971 17.061 0.666971 20.123 2.51497 21.979C4.36497 23.837 7.42197 23.594 9.33497 21.675L14.182 16.808C16.093 14.89 16.333 11.825 14.485 9.96998Z"
                                                fill="white" style={{fill: "white", fillOpacity: 1}}/>
                                        </svg>
                                        <span>Site internet</span>
                                    </a>
                                }

                                {/* TELEPHONE */}
                                {museum.telephone && museum.telephone !== "" &&
                                    <Link to={"tel:" + (museum.telephone.replaceAll(/\s/g, ''))} className={"grey"}>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.5 22.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V17.5C21 17.1022 20.842 16.7206 20.5607 16.4393C20.2794 16.158 19.8978 16 19.5 16C18.33 16 17.18 15.82 16.08 15.45C15.817 15.367 15.5363 15.3576 15.2683 15.4228C15.0004 15.488 14.7554 15.6254 14.56 15.82L13.12 17.26C10.6322 15.9024 8.58758 13.8578 7.23 11.37L8.66 9.94C9.07 9.55 9.22 8.97 9.04 8.41C8.68 7.32 8.5 6.17 8.5 5C8.5 4.60218 8.34196 4.22064 8.06066 3.93934C7.77936 3.65804 7.39782 3.5 7 3.5H3.5C3.10218 3.5 2.72064 3.65804 2.43934 3.93934C2.15804 4.22064 2 4.60218 2 5C2 14.65 9.85 22.5 19.5 22.5ZM3.5 4.5H7C7.13261 4.5 7.25979 4.55268 7.35355 4.64645C7.44732 4.74021 7.5 4.86739 7.5 5C7.5 6.28 7.7 7.53 8.09 8.72C8.14 8.86 8.13 9.06 7.97 9.22L6 11.18C7.65 14.41 10.07 16.83 13.31 18.5L15.26 16.53C15.4 16.39 15.59 16.35 15.77 16.4C16.97 16.8 18.22 17 19.5 17C19.6326 17 19.7598 17.0527 19.8536 17.1464C19.9473 17.2402 20 17.3674 20 17.5V21C20 21.1326 19.9473 21.2598 19.8536 21.3536C19.7598 21.4473 19.6326 21.5 19.5 21.5C10.4 21.5 3 14.1 3 5C3 4.86739 3.05268 4.74021 3.14645 4.64645C3.24021 4.55268 3.36739 4.5 3.5 4.5Z"
                                                fill="white" style={{fill: "white", fillOpacity: 1}}/>
                                        </svg>

                                        <span>{museum.telephone}</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </>
        }
    </div>;
}
