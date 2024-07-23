export class SignupData {
    firstName: string;
    lastName: string;
    designation: string;
    email: string;
    password: string;
    countryCode: string;
    state: string;
    address: string;
    phoneNumber: string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.designation = '';
        this.email = '';
        this.phoneNumber = '';
        this.countryCode = '';
        this.state = '';
        this.address = '';
        this.password = '';
    }
}
