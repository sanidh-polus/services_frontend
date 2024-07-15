import { Country } from "./Country";

export interface SignUp {
    firstname: string;
    lastname: string;
    designation: string;
    email: string;
    userPassword: string;
    country: Country;
    state: string;
    address: string;
    phoneNo: string;
}
