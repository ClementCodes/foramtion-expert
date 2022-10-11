export class ComplexFormValue {
    //1:input 
    personalInfo!: {
        firstName: string,
        lastName: string
    };

    contactPreference!: string;

    email?: {
        email: string,
        confirm: string
    };

    phone?: string;

    loginInfo!: {
        username: string,
        password: string,
        confirmPassword: string,
    };
}