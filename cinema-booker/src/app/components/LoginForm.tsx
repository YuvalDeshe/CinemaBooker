type LoginFormProps = {
    handleLogin: (email: string, password: string) => void
}

export default function LoginForm({handleLogin}: LoginFormProps) {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        handleLogin(email, password);
    }
    // make this pretty
    return( 
    <form onSubmit={onSubmit}>
        <label>
            email: <input type="email" name="email" className="bg-white text-black"></input>
        </label>
        <label>
            password: <input type="password" name="password" className="bg-white text-black"></input>
        </label>
        <button type="submit" className="bg-white text-black p-1">login</button>
    </form>
    )
}