import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from './Login';
import { SignUp } from './Signup';
import { Country } from './Country';

@Injectable({
    providedIn: 'root',
})
export class LoginSignUpService {
    // apiUrl = 'http://10.199.100.140:8080/service/login';
    // proxyUrl = '/api'+'/service/login';
    // private countriesUrl = 'https://restcountries.com/v3.1/all';

    constructor(private http: HttpClient) {}

    checkLoginDetails(loginDetails: Login): Observable<Login[]> {
        return this.http.post<Login[]>('/service/login', loginDetails);
    }

    enterSignUpDetails(signUpDetails: SignUp): Observable<SignUp[]> {
        return this.http.post<SignUp[]>('/service/signup', signUpDetails);
    }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>('/service/countries');
    }
}
