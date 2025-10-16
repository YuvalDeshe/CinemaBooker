'use client';
import LoginForm from "@/app/components/LoginForm";

function login(email: string, password: string) {
    // DATABASE
    // check if the account exists in the database
    // there is no logic to check if the credentials are valid
}

export default function Login() {

    return(
        <div>
            <LoginForm handleLogin={login}></LoginForm>
        </div>
    )
}