import "./style.css"
import {useEffect, useState} from "react";
import MuseumEtiquette from "../../components/museumEtiquette/museumEtiquette.jsx";
import {useUser} from "../../context/UserProvider.jsx";

export default function FavoriteList() {

    const [list, setList] = useState(null)
    const [shareWithMe, setShareWithMe] = useState(null)
    const [idOfListForinputToEdit, setIdOfListForinputToEdit] = useState(null)
    const {token, deleteToken} = useUser()



    useEffect(() => {
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
            setList(result);
        }

        async function getShareWithMe() {
            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/share/get", {
                method: "GET", headers: {
                    "Content-Type": "application/json", "Authorization": `Bearer ${token}`
                }
            })
            if (jsonResponse.status === 401) {
                deleteToken()
                window.location.href = "/registerLoginPage/login";
            }

            const result = await jsonResponse.json();
            setShareWithMe(result);
        }

        if (!list) getFavoritesList()

        if (!shareWithMe) getShareWithMe()


    }, [])

    async function deleteSharing(id) {
        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/share/delete/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }

        const result = await jsonResponse.json()
        if (result.message === "ok") {     setShareWithMe(prev => prev.filter(item => item.id !== id));

        }
    }

    async function removeFavorite(listId,museumId) {
        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/favorite/list/remove/in/" + listId, {
            method: "DELETE",
            body: JSON.stringify({"museumId":museumId}),
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }

        const result = await jsonResponse.json()
        if (result.message==="ok"){
            setList(prev =>
                prev.map(item =>
                    item.id === listId
                        ? { ...item, museums: item.museums.filter(m => m.id !== museumId) }
                        : item
                )
            );
        }


    }

    function changeName(newName, id) {
        setList(prev =>
            prev.map(item =>
                item.id === id ? {...item, name: newName} : item
            )
        );
    }

    async function submit(id) {
        const itemToSave = list.find(item => item.id === id);



        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/favorite/list/edit/" + id, {
            method: "PUT",
            body: JSON.stringify({"name": itemToSave.name})
            , headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }

        const result = await jsonResponse.json();
        if (result.message==="ok"){
            setShareWithMe(result);
            setIdOfListForinputToEdit(null)
        }


    }


    return <div className={"favoriteList page "}>

        {/* List des favoris */}
        <div className="left">
            <h1>Favorit list</h1>



            {list && list.length > 0 && list.map((itemList, index) => (
                <div key={index} className="row">


                    <details>
                        <summary>

                            {/* Render input to edit favorite name */}
                            {idOfListForinputToEdit === itemList.id ? (
                                <input
                                    key={itemList.id}
                                    type="text"
                                    value={itemList.name}
                                    onChange={e => changeName(e.target.value, itemList.id)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter") submit(itemList.id);
                                    }}
                                    onBlur={() => submit(itemList.id)}
                                />
                            ) : (
                                itemList.name
                            )}

                            {/* icon fleche */}
                            <svg className={"icon"} width="20" height="16" viewBox="0 0 20 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.9999 0.499895L0.999914 0.499895C0.817673 0.500466 0.639038 0.55073 0.483238 0.645273C0.327438 0.739817 0.200373 0.87506 0.115719 1.03645C0.031065 1.19783 -0.00797081 1.37926 0.00281143 1.56118C0.0135937 1.7431 0.0737877 1.91864 0.176914 2.0689L9.17691 15.0689C9.54991 15.6079 10.4479 15.6079 10.8219 15.0689L19.8219 2.0689C19.9261 1.91895 19.9872 1.74333 19.9985 1.5611C20.0099 1.37887 19.9711 1.19702 19.8864 1.03529C19.8017 0.873559 19.6742 0.738141 19.518 0.643751C19.3617 0.549361 19.1825 0.499607 18.9999 0.499895ZM10 13.5L2 2L18 2L10 13.5Z"
                                    fill="black" style={{fill: 'black', fillOpacity: 1}}/>
                            </svg>
                        </summary>

                        {/* list of museums */}
                        <div className={"wrapper"}>
                            {itemList.museums.length === 0 && <span>No museum here !</span>}
                            {itemList.museums.map((museum, index) => (
                                <MuseumEtiquette key={index} museum={museum} type={"favoris"}
                                                 callback={()=>removeFavorite(itemList.id,museum.id)}></MuseumEtiquette>
                            ))}
                        </div>


                    </details>


                    {/* Boutton to edit */}
                    <svg className={"edit"} onClick={() => {
                        setIdOfListForinputToEdit(itemList.id)
                    }} width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 15.5H2.098L12.796 4.802L11.698 3.704L1 14.402V15.5ZM0.808004 16.5C0.579338 16.5 0.387338 16.4227 0.232004 16.268C0.0766708 16.1133 -0.000662393 15.9213 4.27351e-06 15.692V14.652C4.27351e-06 14.4307 0.0433377 14.22 0.130004 14.02C0.216671 13.82 0.333004 13.6473 0.479004 13.502L13.18 0.787C13.282 0.695667 13.395 0.625 13.519 0.575C13.643 0.525 13.7723 0.5 13.907 0.5C14.0417 0.5 14.1717 0.521333 14.297 0.564C14.4223 0.606667 14.539 0.682666 14.647 0.792L15.714 1.866C15.824 1.972 15.8993 2.08867 15.94 2.216C15.98 2.34267 16 2.46933 16 2.596C16 2.732 15.9773 2.862 15.932 2.986C15.886 3.10933 15.8133 3.22233 15.714 3.325L2.998 16.021C2.85334 16.1663 2.68067 16.2823 2.48 16.369C2.27934 16.4557 2.06867 16.4993 1.848 16.5H0.808004ZM12.238 4.262L11.698 3.704L12.796 4.802L12.238 4.262Z"
                            fill="black" style={{fill: 'black', fillOpacity: 1}}/>
                    </svg>


                </div>


            ))}

        </div>


        {/* Liste des musées partagé avec moi */}
        <div className="right">
            <h1>Shared with me</h1>
            <div className={"wrapper"}>
                {shareWithMe && shareWithMe.length > 0 && shareWithMe.map((item, index) => (
                    <MuseumEtiquette key={index} museum={item.museum} type={"share"}
                                     callback={()=>deleteSharing(item.id)} share={item}></MuseumEtiquette>

                ))}
            </div>


        </div>
    </div>
        ;
}
