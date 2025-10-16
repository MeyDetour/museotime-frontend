import "./style.css"
import {useUser} from "../../context/UserProvider.jsx";
import {useForm} from "react-hook-form";
import {Link} from "react-router";
import {useState} from "react";

export default function Profile() {
    const {user,deleteToken,token} = useUser();
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {}
    })

    const [error, setError] = useState(null);
    if (!user) {
        window.location.href = "/registerLoginPage/login"
    }
    const onSubmit = async (data) => {
        if (!data.username){
            setError("Please enter your username");
            return
        } if (!data.localisation){
            setError("Please enter your localisation");
            return
        }

        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE+"api/user/edit/me", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${token}`
            }
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }


        const result = await jsonResponse.json();
        if (result.message ==="ok"){
           deleteToken()
            window.location.href = "/registerLoginPage/login";
        }else{
            setError("Something went wrong");
        }

    }
    return <div className={"profile page"}>
        <h1>{user.username}</h1>
        <form className={""} onSubmit={handleSubmit(onSubmit)}>


            {error && <span style={{color: 'red'}}>{error}</span>}
            <div>
                <h3>Username</h3>
                <input {...register("username")} type="text" defaultValue={user.username}/>
            </div>

            <div>
                <h3>Localisation</h3>
                <input {...register("localisation")} defaultValue={user.localisation} type="text"/>
            </div>

            <input type="submit" className={"button"} value={"Update"}/>


        </form>


        <p>Conformément à son droit à l'effacement, l'utilisateur peut demander la suppression de son compte et de toutes ses données personnelles associées. Toutefois, les éléments qu'il a partagés seront conservés pour assurer la cohérence de la plateforme, mais son nom d'utilisateur sera remplacé par un profil générique  "Utilisateur supprimé". <u>Supprimer mon compte</u></p>

    <button onClick={()=>deleteToken}>Disconnect</button>
    </div>;
}
