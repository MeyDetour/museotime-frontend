import "../LoginForm/style.css"

import {useForm, useWatch} from "react-hook-form";
import {Link} from "react-router";
import {useState} from "react";

export default function RegisterForm(props) {
    const {
        register,
        handleSubmit,

        reset,
        formState,
        formState: {isSubmitSuccessful},
    } = useForm({
        defaultValues: {}
    })
    const [error, setError] = useState(null);
    const onSubmit = async (data) => {
        console.log(data);

        let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "register", {
            method: "post",
            body: JSON.stringify(data),
        })

        const result = await jsonResponse.json();
        if (result.message!=="ok") {
            console.log(result.message);
            setError(result.message);
        }else{
            setError(null);
            window.location.href = "/registerLoginPage/login";
        }


    }

    return <form className={"loginRegisterForm"} onSubmit={handleSubmit(onSubmit)}>

        <h1>Register</h1>
        {error && <span style={{color:'red'}}>{error}</span>}
        <div>
            <h3>Username</h3>
            <input {...register("username")} type="text" placeholder="John Doe"/>
        </div>
        <div>
            <h3>Localisation</h3>
            <input {...register("localisation")} type="text" placeholder="Paris"/>
        </div>
        <div>
            <h3>Password</h3>
            <input {...register("password")} type="password"/>
        </div>

        <input type="submit" className={"button"} value={"Create account"}/>
        <Link to={"/registerLoginPage/login"}>Login</Link>


    </form>
        ;
}
