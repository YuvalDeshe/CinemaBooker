'use server';

import { signIn, signOut } from "@/app/api/auth/route";

export async function doLogout() {
    await signOut({ redirectTo: "/"});
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

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