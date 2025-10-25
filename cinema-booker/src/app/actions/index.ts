'use client';

// import { signIn, signOut } from "@/app/api/auth/route";
import { signIn, signOut } from 'next-auth/react';

export async function doLogout() {
    await signOut({ redirect: true, callbackUrl: "/"});
}

export async function doCredentialLogin(email: string, password: string): Promise<any> {
    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false, // change this to true if we run into issues
                             // i copied it from our web-dev project but we may want it to be true
        });

        return response;
    } catch (err: any) {
        throw err;
    }
}