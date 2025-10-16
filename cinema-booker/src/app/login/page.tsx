'use client';
import LoginForm from "@/app/components/LoginForm";

function login(email: String, password: String) {
    // DATABASE
    // check if the account exists in the database
}

export default function Login() {

    return(
        <div>
            <LoginForm handleLogin={login}></LoginForm>
        </div>
    )
}