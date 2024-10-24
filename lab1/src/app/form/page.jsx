"use client";

import { useEffect, useState } from "react";

function useFormInput(initialValue, key) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(storedValue);
        }
    }
    }, [key]);
    useEffect(() => {
        if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
        }
    }, [value, key]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
}

export default function Form() {
    const firstName = useFormInput("", "firstName");
    const lastname = useFormInput("", "lastname");
    const email = useFormInput("", "email");
    const username = useFormInput("", "username");
    const password = useFormInput("", "password");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("formulario enviado con los datos:");
        console.log({
            firstName: firstName.value,
            lastname: lastname.value,
            email: email.value,
            username: username.value,
            password: password.value,
            
        });
    };

    return (
        <div>
            <h1>Formulario de Registro</h1>
            <form onSubmit= {handleSubmit} style= {{display: "flex", flexDirection: "column", gap:"10px" }} >
                <label>
                    Nombres:
                    <input type="text" {...firstName} required />
                </label>
                <label>
                    Apellidos:
                    <input type="text" {...lastname} required />
                </label>
                <label>
                    Email:
                    <input type="email" {...email} required />
                </label>
                <label>
                    Username:
                    <input type="text" {...username} required />
                </label>
                <label>
                    Password:
                    <input type="password" {...password} required />
                </label>
                <button type="submit">Enviar</button>
            </form>

            <h2>Datos cargados desde LocalStorage:</h2>
            <p><strong>Nombres:</strong> {firstName.value}</p>
            <p><strong>Apellidos:</strong> {lastname.value}</p>
            <p><strong>Email:</strong> {email.value}</p>
            <p><strong>Username:</strong> {username.value}</p>
        </div>
    )
}

