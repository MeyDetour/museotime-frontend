import "./style.css"
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import MuseumMap from "../../components/Map/Map.jsx";
import {useUser} from "../../context/UserProvider.jsx";
import ShareWidget from "../../components/ShareWidget/ShareWidget.jsx";

export default function MuseumDetails() {
    const {id} = useParams();
    const [museum, setMuseum] = useState(null)
    const [liked, setLiked] = useState(null)
    const [wantToShare, setWantToShare] = useState(false)
    const [favoritesLists, setFavoritesList] = useState([])

    const {token, user, deleteToken} = useUser()
    useEffect(() => {
        async function getData() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "museum/" + id, {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setMuseum(result);
            console.log(result);

            if (user) {
                setLiked(user.favoriteLists.includes(result.identifiant));
            }

        }

        if (!museum) {
            getData()
        }
    }, [])

    async function dislikeMuseum() {
        console.log("dislikeMuseum");
        console.log("user in fct : " + user)
        if (user) {
            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/favorite/list/remove/one/item", {
                method: "DELETE", body: JSON.stringify({"museumId": museum.identifiant}), headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
            if (jsonResponse.status === 401) {
                deleteToken()
                window.location.href = "/registerLoginPage/login";
            }

            const result = await jsonResponse.json();
            console.log(result);
            if (result.message === "ok") {
                setLiked(false)
            }
        }
    }


    function likeMuseum(favoriteListId) {
        async function likeMuseumRequest() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/favorite/list/add/in/" + (favoriteListId), {
                method: "PUT", body: JSON.stringify({"museumId": museum.identifiant}), headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
            if (jsonResponse.status === 401) {
                deleteToken()
                window.location.href = "/registerLoginPage/login";
            }

            const result = await jsonResponse.json();
            if (result.message == "ok") {
                setLiked(true)
                setFavoritesList(null)
            }
        }

        console.log("user in fct : " + user)

        if (!user) {

            console.log("no user " + user)
            window.location.href = "/registerLoginPage";
        } else {
            likeMuseumRequest()
        }
    }

    function wantTolikeMuseum() {
        async function getFavoritesList() {
            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/favorite/list/get/all", {
                method: "GET", headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
            if (jsonResponse.status === 401) {
                deleteToken()
                window.location.href = "/registerLoginPage/login";
            }

            const result = await jsonResponse.json();
            setFavoritesList(result);
            console.log(result);
        }

        console.log("user in fct : " + user)

        if (!user) {
            console.log("no user " + user)
            window.location.href = "/registerLoginPage";
        } else {
            getFavoritesList()
        }
    }

    console.log(user)

    return <div className={"museumDetails page"}>

        {!museum ?
            <span>Loading...</span>
            :

            <>
            {wantToShare && <ShareWidget setShare={setWantToShare} musem={museum}></ShareWidget> }

            <div className="leftData">
                <div className="container ">
                    {museum.region && museum.region != "" && <div className="elt">
                        <h3>Région</h3>
                        <span>{museum.region}</span>
                    </div>}
                    {museum.departement && museum.departement != "" && <div className="elt">
                        <h3>Département</h3>
                        <span>{museum.departement}</span>
                    </div>}
                    {museum.annee_creation && museum.annee_creation != "" && <div className="elt">
                        <h3>Année de création</h3>
                        <span>{museum.annee_creation}</span>
                    </div>}
                    {museum.categorie && museum.categorie != "" && <div className="elt">
                        <h3>Catégorie</h3>
                        <span>{museum.categorie}</span>
                    </div>}
                    {museum.personnage_phare && museum.personnage_phare != "" && <div className="elt">
                        <h3>Personnage Phare</h3>
                        <span>{museum.personnage_phare}</span>
                    </div>}
                    {museum.protection_batiment && museum.protection_batiment != "" && <div className="elt">
                        <h3>Personnage Phare</h3>
                        <span>{museum.protection_batiment.split("http")[0].trim().replace(/[:\s]+$/, "")}</span>
                    </div>}

                </div>
                {museum.domaine_thematique && museum.domaine_thematique.length > 0 && <div className="container">
                    <h3>Domaine thématique</h3>
                    <div className={"wrapList"}>
                        {museum.domaine_thematique.map((item, index) => (<span key={index}>{item}</span>))}
                    </div>
                </div>}
                {museum.themes && museum.themes.length > 0 && <div className="container">
                    <h3>Themes</h3>
                    <div className={"wrapList"}>
                        {museum.themes.map((theme, index) => (<span key={index}>{theme}</span>))}
                    </div>
                </div>} {museum.artiste && museum.artiste.length > 0 && <div className="container">
                <h3>Artistes</h3>
                <div className={"wrapList"}>
                    {museum.artiste.map((artiste, index) => (<span key={index}>{artiste}</span>))}
                </div>
            </div>}
                {museum.personnage_phare && museum.personnage_phare.length > 0 && <div className="container">
                    <h3>Personnages</h3>
                    <div className={"wrapList"}>
                        {museum.personnage_phare.map((pp, index) => (<span key={index}>{pp}</span>))}
                    </div>
                </div>}

            </div>
            <div className="rightData">

                {/* IMAGE */}
                <div className="imgContainer">

                    {/* Favorite list container */}
                    {favoritesLists && favoritesLists.length > 0 && <div className="favoriteListContainer">
                        {favoritesLists.map((item, index) => (
                            <span key={index} onClick={() => likeMuseum(item.id)}>{item.name}</span>))}
                    </div>}

                    <div className={"iconContainer"}>
                        {/* HEART */}
                        <div onClick={() => {

                            if (liked || (user && user.favoriteLists.includes(museum.identifiant)) || museum.liked) {
                                dislikeMuseum()
                            } else {
                                wantTolikeMuseum()
                            }
                        }}
                             className={liked || (user && user.favoriteLists.includes(museum.identifiant)) || museum.liked ? "liked" : ""}
                             id={"svgHeart"}></div>

                        {/* SHARE */}
                        <div onClick={()=>{
                            if (user) {
                                setWantToShare(true)
                            }else {
                                window.location.href = "/registerLoginPage/login";
                            }

                        }} id={"share"}></div>


                        {/* CLOSE */}
                        <Link to={"/museums"}>
                            <div id={"close"}></div>
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
                    {museum.protection_batiment && <span
                        className={"greenEtiquettes"}>{museum.protection_batiment.split("http")[0].trim().replace(/[:\s]+$/, "")}</span>}


                    <div className="rowMap">

                        {/* MAP */}
                        <MuseumMap lon={museum.coordonnees.lon} lat={museum.coordonnees.lat}></MuseumMap>

                        {/* SITE INTERNET, TELEPHONE  */}
                        <div className={"data"}>

                            {/* LOCALISATION */}
                            <p>{museum.lieu && museum.lieu + ":"}{museum.adresse}, {museum.ville} {museum.code_postal} </p>

                            {/* SITE WEB */}
                            {museum.url && museum.url !== "" && <a href={"https://" + museum.url} className={"grey"}>
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
                            </a>}

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
                                </Link>}
                        </div>
                    </div>
                </div>

            </div>
        </>}
    </div>;
}
