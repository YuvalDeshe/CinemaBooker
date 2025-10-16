type RegisterFormProps = {
    handleRegister: (email: string, password: string) => void
}

export default function RegisterForm({handleRegister}: RegisterFormProps) {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        handleRegister(email, password);
    }
    // make this pretty
    return( 
    <form onSubmit={onSubmit}>
        <label>
            name: <input type="text" required name="password" className="bg-white text-black"></input>
        </label>
        <label>
            phone number: <input type="text" required name="password" className="bg-white text-black"></input>
        </label>
        <label>
            email: <input type="email" required name="email" className="bg-white text-black"></input>
        </label>
        <label>
            password: <input type="password" required name="password" className="bg-white text-black"></input>
        </label>
        {/* add optional payment information inputs */}
        <button type="submit" className="bg-white text-black p-1">register</button>
    </form>
    )
}