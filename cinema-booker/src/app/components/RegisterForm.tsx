type RegisterFormProps = {
    handleRegister: (fname: string, lname: string, phone: string, email: string, password: string) => void
}

export default function RegisterForm({handleRegister}: RegisterFormProps) {

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const fname = String(data.get('fname') ?? '');
        const lname = String(data.get('lname') ?? '');
        const phone = String(data.get('phone') ?? '');
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        handleRegister(fname, lname, phone, email, password);
    }

    return( // make this pretty
    <form onSubmit={onSubmit}>
        <label>
            first name: <input type="text" required name="fname" className="bg-white text-black m-2"></input>
        </label>
        <br></br>
        <label>
            last name: <input type="text" required name="lname" className="bg-white text-black m-2"></input>
        </label>
        <br></br>
        <label>
            phone number: <input type="text" required name="phone" className="bg-white text-black m-2"></input>
        </label>
        <br></br>
        <label>
            email: <input type="email" required name="email" className="bg-white text-black m-2"></input>
        </label>
        <br></br>
        <label>
            password: <input type="password" required name="password" className="bg-white text-black m-2"></input>
        </label>
        <br></br>
        {/* add optional payment information inputs */}
        <button type="submit" className="bg-white text-black p-1">register</button>
    </form>
    )
}