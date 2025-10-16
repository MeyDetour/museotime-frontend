import "./style.css";

import {useForm, useWatch} from "react-hook-form";
import {Link} from "react-router";
import {useState} from "react";
import {useUser} from "../../context/UserProvider.jsx";

export default function LoginForm() {
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
    const {token, setToken,deleteToken} = useUser();
    const onSubmit = async (data) => {
        console.log(data);

        let jsonResponse = await fetch("https://localhost:8000/api/login_check", {
            method: "POST",
            body: JSON.stringify(data), headers: {
                "Content-Type": "application/json"
            },
        })
        if (jsonResponse.status === 401) {
            deleteToken()
            window.location.href = "/registerLoginPage/login";
        }


        const result = await jsonResponse.json();
        if (!result.token) {
            console.log(result);
            setError(result);

        } else {
            console.log(result.token)
            setToken(result.token);
            window.location.href = "/museums";
        }


    }

    return <form className={"loginRegisterForm"} onSubmit={handleSubmit(onSubmit)}>

        <h1>Login</h1>

        {error && <span style={{color: 'red'}}>{error}</span>}
        <div>
            <h3>Username</h3>
            <input {...register("username")} type="text" placeholder="John Doe"/>
        </div>

        <div>
            <h3>Password</h3>
            <input {...register("password")} type="password"/>
        </div>

        <input type="submit" className={"button"} value={"Connect"}/>
        <Link to={"/registerLoginPage/register"}>Register</Link>


    </form>
        ;
}
