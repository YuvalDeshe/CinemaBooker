import { useState } from "react";

type RegisterFormProps = {
    handleRegister: (fname: string, lname: string, phone: string, 
    email: string, password: string, cardType: string, cardNumber: string, 
    expDate: string, billingStreet: string, billingCity: string, billingState: string, 
    billingZip: string, street: string, city: string, state: string, zip: string, promo: boolean) => void
}

export default function RegisterForm({ handleRegister }: RegisterFormProps) {

    const [enterCard, setEnterCard] = useState(false);
    const checkCardBox = () => setEnterCard(!enterCard);

    const [enterAddress, setEnterAddress] = useState(false);
    const checkAddressBox = () => setEnterAddress(!enterAddress);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const fname = String(data.get('fname') ?? '');
        const lname = String(data.get('lname') ?? '');
        const phone = String(data.get('phone') ?? '');
        const email = String(data.get('email') ?? '');
        const password = String(data.get('password') ?? '');
        const cardType = String(data.get('cardType') ?? '');
        const cardNumber = String(data.get('cardNumber') ?? '');
        const expDate = String(data.get('expDate') ?? '');
        const billingStreet = String(data.get('billingStreet') ?? '');
        const billingCity = String(data.get('billingCity') ?? '');
        const billingState = String(data.get('billingState') ?? '');
        const billingZip = String(data.get('billingZip') ?? '');
        const street = String(data.get('street') ?? '');
        const city = String(data.get('city') ?? '');
        const state = String(data.get('state') ?? '');
        const zip = String(data.get('zip') ?? '');
        const promo = Boolean(data.get('promo'));
        handleRegister(fname, lname, phone, email, password, cardType, cardNumber, expDate, billingStreet, billingCity, billingState, billingZip, street, city, state, zip, promo);
    }

    return ( // make this pretty
        <div>
            register page
            <form onSubmit={onSubmit}>
                <label>
                    First name: <input type="text" required name="fname" className="bg-white text-black m-2"></input>
                    <br></br>
                </label>
                <label>
                    Last name: <input type="text" required name="lname" className="bg-white text-black m-2"></input>
                    <br></br>
                </label>
                <label>
                    Phone number: <input type="tel" required name="phone" className="bg-white text-black m-2"></input>
                    <br></br>
                </label>
                <label>
                    Email: <input type="email" required name="email" className="bg-white text-black m-2"></input>
                    <br></br>
                </label>
                <label>
                    Password: <input type="password" required name="password" className="bg-white text-black m-2"></input>
                    <br></br>
                </label>
                <label>
                    Enter payment details? <input type="checkbox" name="enterCard" className="bg-white text-black m-2" onClick={checkCardBox}></input>
                </label>
                <br></br>
                {enterCard && (
                    <div>
                        <div className="p-2 ml-5 outline w-fit">
                            <label>
                                Card type:
                                <div>
                                    <label>
                                        <input type="radio" required name="cardType" id="debit" value="debit" className="bg-white text-black m-2" /> Debit
                                    </label>

                                    <label>
                                        <input type="radio" required name="cardType" id="credit" value="credit" className="bg-white text-black m-2" /> Credit
                                    </label>
                                </div>
                            </label>
                            {/* card number, expiration date, billing address */}
                            <label>
                                Card number: <input type="text" required name="cardNumber" className="bg-white text-black m-2"></input>
                                <br></br>
                            </label>
                            <label>
                                Expiration date: <input type="text" required name="expDate" className="bg-white text-black m-2"></input>
                                <br></br>
                            </label>
                            <label>
                                Billing address: 
                                <br></br>
                                <label className="ml-5">Street:<input type="text" required name="billingStreet" className="bg-white text-black m-2"></input><br></br></label>
                                <label className="ml-5">City:<input type="text" required name="billingCity" className="bg-white text-black m-2"></input><br></br></label>
                                <label className="ml-5">State:<input type="text" required name="billingState" className="bg-white text-black m-2"></input><br></br></label>
                                <label className="ml-5">Zip:<input type="text" required name="billingZip" className="bg-white text-black m-2"></input><br></br></label>
                            </label>
                        </div>
                        <br></br>
                    </div>
                )}
                <label>
                    Enter address? <input type="checkbox" name="enterAddress" className="bg-white text-black m-2" onClick={checkAddressBox}></input>
                    <br></br>
                    {enterAddress && (
                        <div>
                            <div className="p-2 ml-5 outline w-fit">

                                <label>
                                    Street: <input type="text" required name="street" className="bg-white text-black m-2"></input>
                                    <br></br>
                                </label>
                                <label>
                                    City: <input type="text" required name="city" className="bg-white text-black m-2"></input>
                                    <br></br>
                                </label>
                                <label>
                                    State: <input type="text" required name="state" className="bg-white text-black m-2"></input>
                                    <br></br>
                                </label>
                                <label>
                                    Zip: <input type="text" required name="zip" className="bg-white text-black m-2"></input>
                                    <br></br>
                                </label>
                            </div>
                            <br></br>
                        </div>
                    )}
                </label>
                <label>
                    Sign up for promotional emails? <input type="checkbox" name="promo" className="bg-white text-black m-2" ></input>
                </label>
                <br></br>
                <button type="submit" className="bg-white text-black p-1">Register</button>
            </form>
            <label>Already have an account? <a href="/login" className="text-blue-400 underline">Login</a></label>
        </div>
    )
}