'use client';
import RegisterForm from "@/app/components/RegisterForm";

function register(fname: string, lname: string, phone: string, 
    email: string, password: string, cardType: string, cardNumber: string, 
    expDate: string, billingStreet: string, billingCity: string, billingState: string, 
    billingZip: string, street: string, city: string, state: string, zip: string) {
        /* 
        ===DATABASE===
        - register the account in the database
          then probably send the user to the login page?

        - the RegisterForm does NOT check to make sure the data
          is valid. i'm happy to implement that if you want, but
          i just wanted to get a proof of concept done so you
          had something to work with.

        - remember to hash the password

        - this info should PROBABLY be put into a User object
          of some sort before it's passed to this method. I
          decided I'd let you handle that so you can arrange
          the data the way that best works for you

        - there is the start of a User schema in src/models/userSchema.ts.
          it is very incomplete and maybe you have a different way of
          organizing it, but i thought i would need this and abandoned it along the way.
        */
        console.log(`fname: ${fname}`);
        console.log(`lname: ${lname}`)
        console.log(`phone: ${phone}`)
        console.log(`email: ${email}`);
        console.log(`password: ${password}`);
        console.log(`credit card:`)
        console.log(`\tcardType: ${cardType}`)
        console.log(`\tcardNumber: ${cardNumber}`)
        console.log(`\texpDate: ${expDate}`);
        console.log(`\tbillingStreet: ${billingStreet}`)
        console.log(`\tbillingCity: ${billingCity}`)
        console.log(`\tbillingState: ${billingState}`)
        console.log(`\tbillingZip: ${billingZip}`);
        console.log(`address:`)
        console.log(`\tstreet: ${street}`)
        console.log(`\tcity: ${city}`)
        console.log(`\tstate: ${state}`)
        console.log(`\tzip: ${zip}`);
}

export default function Register() {

    return(
        <div>
            <RegisterForm handleRegister={register}></RegisterForm>
        </div>
    )
}