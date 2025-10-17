type LoginFormProps = {
    handleLogin: (email: string, password: string) => void
}

export default function LoginForm({ handleLogin }: LoginFormProps) {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        handleLogin(email, password);
    }
    // make this pretty
    return (
        <div>
            login page
            <form onSubmit={onSubmit}>
                <label>
                    Email: <input type="email" name="email" className="bg-white text-black m-2"></input>
                </label>
                <br></br>
                <label>
                    Password: <input type="password" name="password" className="bg-white text-black m-2"></input>
                </label>
                <br></br>
                <button type="submit" className="bg-white text-black p-1">login</button>
            </form>
            <br></br>
            <label>Don't have an account? <a href="/register" className="text-blue-400 underline">Register</a></label>
        </div>
    )
}