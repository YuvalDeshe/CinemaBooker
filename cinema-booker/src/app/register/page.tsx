'use client';
import RegisterForm from "@/app/components/RegisterForm";

function register(email: String, password: String) {
    // DATABASE
    // register the account in the database
    // remember to hash the password
}

export default function Register() {

    return(
        <div>
            <RegisterForm handleRegister={register}></RegisterForm>
        </div>
    )
}