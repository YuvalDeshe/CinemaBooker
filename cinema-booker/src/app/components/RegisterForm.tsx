import { useState } from "react";
import User from "@/types/User";
import Card from "@/types/Card";
import BackgroundReel from "@/app/components/BackgroundReel";


type RegisterFormProps = {
    handleRegister: (user: User) => void
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
        const expMonth = String(data.get('expMonth') ?? '');
        const expYear = String(data.get('expYear') ?? '');
        const billingStreet = String(data.get('billingStreet') ?? '');
        const billingCity = String(data.get('billingCity') ?? '');
        const billingState = String(data.get('billingState') ?? '');
        const billingZip = String(data.get('billingZip') ?? '');
        const street = String(data.get('street') ?? '');
        const city = String(data.get('city') ?? '');
        const state = String(data.get('state') ?? '');
        const zip = String(data.get('zip') ?? '');
        const promo = Boolean(data.get('promo'));

        let card = new Card(cardType, cardNumber, expMonth, expYear, billingStreet, billingCity, billingState, billingZip);
        let address = {street, city, state, zip};
        let user = new User(fname, lname, phone, email, password, promo, address, [card]);
        if (user.getCards()[0].getCardType() == '') { // if the user didn't enter a card, remove the blank card
            user.removeCard(0);
        }
        handleRegister(user);
    }

    return (
  <div className="relative min-h-screen flex items-center justify-center bg-[#0b1221] text-white">
    <BackgroundReel />

    <div className="relative z-10 w-full max-w-2xl p-[1px] rounded-2xl bg-gradient-to-b from-blue-500/60 via-blue-400/20 to-transparent">
      <div className="bg-[#1b2235]/85 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/60 p-8">
        <h1 className="text-3xl font-semibold text-center mb-2">Create Account</h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Join <span className="font-medium">Cinema E-Booking</span>
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fname" className="block mb-1 text-gray-300">First name</label>
              <input
                id="fname" name="fname" required type="text"
                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Jane"
              />
            </div>
            <div>
              <label htmlFor="lname" className="block mb-1 text-gray-300">Last name</label>
              <input
                id="lname" name="lname" required type="text"
                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Doe"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-gray-300">Phone number</label>
              <input
                id="phone" name="phone" required type="tel"
                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="(555) 555-5555"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-300">Email</label>
              <input
                id="email" name="email" required type="email" autoComplete="email"
                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="password" className="block mb-1 text-gray-300">Password</label>
              <input
                id="password" name="password" required type="password" autoComplete="new-password"
                className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Payment toggle */}
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="enterCard"
                onClick={checkCardBox}
                className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400"
              />
              Enter payment details?
            </label>

            {enterCard && (
              <div className="rounded-xl border border-gray-700/60 bg-[#22283b]/50 p-4">
                <div className="flex gap-6 flex-wrap">
                  <label className="inline-flex items-center gap-2 text-gray-200">
                    <input type="radio" required name="cardType" value="debit" className="h-4 w-4" />
                    Debit
                  </label>
                  <label className="inline-flex items-center gap-2 text-gray-200">
                    <input type="radio" required name="cardType" value="credit" className="h-4 w-4" />
                    Credit
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block mb-1 text-gray-300">Card number</label>
                    <input
                      id="cardNumber" name="cardNumber" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div>
                    <label htmlFor="expMonth" className="block mb-1 text-gray-300">Exp. month</label>
                    <input
                      id="expMonth" name="expMonth" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="MM"
                    />
                  </div>
                  <div>
                    <label htmlFor="expYear" className="block mb-1 text-gray-300">Exp. year</label>
                    <input
                      id="expYear" name="expYear" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="YYYY"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Billing address</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="billingStreet" className="block mb-1 text-gray-300">Street</label>
                      <input
                        id="billingStreet" name="billingStreet" required type="text"
                        className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity" className="block mb-1 text-gray-300">City</label>
                      <input
                        id="billingCity" name="billingCity" required type="text"
                        className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingState" className="block mb-1 text-gray-300">State</label>
                      <input
                        id="billingState" name="billingState" required type="text"
                        className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingZip" className="block mb-1 text-gray-300">Zip</label>
                      <input
                        id="billingZip" name="billingZip" required type="text"
                        className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Address toggle */}
          <div className="space-y-3">
            <label className="inline-flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                name="enterAddress"
                onClick={checkAddressBox}
                className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400"
              />
              Enter address?
            </label>

            {enterAddress && (
              <div className="rounded-xl border border-gray-700/60 bg-[#22283b]/50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="street" className="block mb-1 text-gray-300">Street</label>
                    <input
                      id="street" name="street" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block mb-1 text-gray-300">City</label>
                    <input
                      id="city" name="city" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block mb-1 text-gray-300">State</label>
                    <input
                      id="state" name="state" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block mb-1 text-gray-300">Zip</label>
                    <input
                      id="zip" name="zip" required type="text"
                      className="w-full p-3 rounded-md bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Promos */}
          <label className="inline-flex items-center gap-2 text-gray-300">
            <input type="checkbox" name="promo" className="h-4 w-4 rounded border-gray-400 text-blue-500 focus:ring-blue-400" />
            Sign up for promotional emails?
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-md transition-all duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-300 hover:text-blue-200 underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  </div>
);
}