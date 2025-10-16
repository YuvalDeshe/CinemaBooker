'use client';
import RegisterForm from "@/app/components/RegisterForm";

function register(fname: string, lname: string, phone: string, email: string, password: string) {
    // DATABASE
    // register the account in the database
    // remember to hash the password
    // i assume we'll take the user to a different page to add their 
}

export default function Register() {

    return(
        <div>
            <RegisterForm handleRegister={register}></RegisterForm>
        </div>
    )
}