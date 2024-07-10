import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Login {
  email: string;
  password: string;
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
export class DataService {
  // apiUrl = 'http://10.199.100.140:8080/service/login';
  // proxyUrl = '/api'+'/service/login';

  constructor(private http: HttpClient) {}

  checkLoginDetails(loginDetails: any): Observable<any> {
    return this.http.post<Login[]>('/service/login', loginDetails);
  }

  enterSignupDetails(signupDetails: any): Observable<any> {
    return this.http.post<Signup[]>('/service/signup', signupDetails);
  }

  private countriesUrl = 'https://restcountries.com/v3.1/all';

  getCountries(): Observable<any> {
    return this.http.get<Country[]>(this.countriesUrl);
  }
}
