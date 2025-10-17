'use client';
import LoginForm from "@/app/components/LoginForm";

function login(email: string, password: string) {
        /* 
        ===DATABASE===
        - check if the provided credentials match a user in
          the database. if they do, log them in. i can handle
          the technical aspects of logging them in and tracking
          their session if you want me to

        - the LoginForm should check that the email is in the
          correct format before allowing the user to submit

        - remember to hash the password!!!!!
        */

    console.log(`email: ${email}`)
    console.log(`password: ${password}`)
}

export default function Login() {

    return(
        <div>
            <LoginForm handleLogin={login}></LoginForm>
        </div>
    )
}