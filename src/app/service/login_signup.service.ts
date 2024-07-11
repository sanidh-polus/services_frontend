import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Login {
    email: string;
    userpassword: string;
}

interface Signup {
    firstname: string;
    lastname: string;
    designation: string;
    email: string;
    userPassword: string;
    country: string;
    state: string;
    address: string;
    phoneNo: string;
}

interface Country {
    name: {
        common: string;
    };
}

@Injectable({
    providedIn: 'root',
})
export class LoginSignupService {
    // apiUrl = 'http://10.199.100.140:8080/service/login';
    // proxyUrl = '/api'+'/service/login';
    // private countriesUrl = 'https://restcountries.com/v3.1/all';

    constructor(private http: HttpClient) {}

    checkLoginDetails(loginDetails: Login): Observable<any> {
        return this.http.post<Login[]>('/service/login', loginDetails);
    }

    enterSignupDetails(signupDetails: Signup): Observable<any> {
        return this.http.post<Signup[]>('/service/signup', signupDetails);
    }

    getCountries(): Observable<any> {
        return this.http.get<Country[]>('/service/countries');
    }
}
