import "./style.css"
import {useState} from "react";
import {useUser} from "../../context/UserProvider.jsx";

export default function ShareWidget({setShare, museumId}) {
    const [copied, setCopied] = useState(false);
    const [searchResult, setSearchResult] = useState(null);
    const [shared, setShared] = useState([]);
    const [error, setError] = useState(null);
    const {token, deleteToken} = useUser()

    function copy() {
        navigator.clipboard.writeText(window.location.href).then(
            () => {
                console.log("copied!");
                setCopied(true);
            },
            () => {
                console.log("failed to copy")
            },
        )
    }

    async function searchUser(event) {
        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/user/search?search=" + event.target.value, {
            method: "GET", headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }

        const result = await jsonResponse.json();
        setSearchResult(result);
    }

    async function shareWithUser(userId) {
        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/share/museum/to/user/" + userId, {
            method: "POST",
            body: JSON.stringify({"museumId": museumId}),
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }

        const result = await jsonResponse.json();
        if (result.message === "ok") {
            setShared(prev =>[...prev,userId] )
            setError(null)
        } else {
            setError("failed to share")
        }


    }

    console.log(shared)


    return <div className={"shareWidget "}>
        <div className={"widget"}>
            <svg onClick={() => setShare(false)} className={"close"} width="19" height="19" viewBox="0 0 19 19"
                 fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1.80016 18.1735L0.82666 17.2L8.52666 9.50001L0.82666 1.80001L1.80016 0.826508L9.50016 8.52651L17.2002 0.826508L18.1737 1.80001L10.4737 9.50001L18.1737 17.2L17.2002 18.1735L9.50016 10.4735L1.80016 18.1735Z"
                    fill="black" style={{fill: 'black', fillOpacity: 1}}/>
            </svg>

            <h1>Partager</h1>
            {error && <span style={{color: 'red'}}>{error}</span>}
            <input type="text" placeholder="Seach user" onChange={searchUser}/>
            {searchResult && searchResult.length > 0 && searchResult.map((item, index) => (
                <div key={index}>
                    <span>{item.username}</span>
                    {shared && shared.length> 0 && shared.includes(item.id) ?
                        <button className={"green"}>Partagé</button>
                    :
                        <button onClick={()=>shareWithUser(item.id)}>Partager</button>
                    }

                </div>
            ))
            }

        </div>
        <div className={"widget2"}>
            <h1>Copier le lien</h1>
            <div>
                <p>{window.location.href}</p>
                {copied ?
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M28.8722 13.75C28.8557 10.7594 28.7238 9.13963 27.6664 8.08363C26.4591 6.875 24.5135 6.875 20.625 6.875H16.5C12.6115 6.875 10.6659 6.875 9.45863 8.08363C8.25 9.29088 8.25 11.2365 8.25 15.125V22C8.25 25.8885 8.25 27.8341 9.45863 29.0414C10.6659 30.25 12.6115 30.25 16.5 30.25H20.625C24.5135 30.25 26.4591 30.25 27.6664 29.0414C28.875 27.8341 28.875 25.8885 28.875 22V20.625"
                            stroke="black" style={{stroke: 'black', strokeOpacity: 1}} strokeWidth="1.5"
                            strokeLinecap="round"/>
                        <path
                            d="M4.125 13.75V22C4.125 23.094 4.5596 24.1432 5.33318 24.9168C6.10677 25.6904 7.15598 26.125 8.25 26.125M24.75 6.875C24.75 5.78098 24.3154 4.73177 23.5418 3.95818C22.7682 3.1846 21.719 2.75 20.625 2.75H15.125C9.93988 2.75 7.34662 2.75 5.7365 4.3615C4.83725 5.25937 4.43988 6.4625 4.26525 8.25"
                            stroke="black" style={{stroke: 'black', strokeOpacity: 1}} strokeWidth="1.5"
                            strokeLinecap="round"/>
                        <path d="M14.9999 23.2L10.7999 19L9.3999 20.4L14.9999 26L26.9999 14L25.5999 12.6L14.9999 23.2Z"
                              fill="#00A627" style={{fill: '#00A627', fillOpacity: 1}}/>
                    </svg> :
                    <svg onClick={() => copy()} width="33" height="33" viewBox="0 0 33 33" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M28.8722 13.75C28.8557 10.7594 28.7238 9.13963 27.6664 8.08363C26.4591 6.875 24.5135 6.875 20.625 6.875H16.5C12.6115 6.875 10.6659 6.875 9.45863 8.08363C8.25 9.29088 8.25 11.2365 8.25 15.125V22C8.25 25.8885 8.25 27.8341 9.45863 29.0414C10.6659 30.25 12.6115 30.25 16.5 30.25H20.625C24.5135 30.25 26.4591 30.25 27.6664 29.0414C28.875 27.8341 28.875 25.8885 28.875 22V20.625"
                            stroke="black" style={{stroke: 'black', strokeOpacity: 1}} strokeWidth="1.5"
                            strokeLinecap="round"/>
                        <path
                            d="M4.125 13.75V22C4.125 23.094 4.5596 24.1432 5.33318 24.9168C6.10677 25.6904 7.15598 26.125 8.25 26.125M24.75 6.875C24.75 5.78098 24.3154 4.73177 23.5418 3.95818C22.7682 3.1846 21.719 2.75 20.625 2.75H15.125C9.93988 2.75 7.34662 2.75 5.7365 4.3615C4.83725 5.25937 4.43988 6.4625 4.26525 8.25"
                            stroke="black" style={{stroke: 'black', strokeOpacity: 1}} strokeWidth="1.5"
                            strokeLinecap="round"/>
                    </svg>
                }


            </div>
        </div>
    </div>;
}
