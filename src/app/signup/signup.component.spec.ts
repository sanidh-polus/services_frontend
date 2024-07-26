import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './signup.component';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('SignupComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SignUpComponent],
            providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
