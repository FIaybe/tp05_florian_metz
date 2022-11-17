export class Client {
    name: string = '';
    firstName: string = '';
    address: string = '';
    zipCode: string = '';
    city: string = '';
    country: string = '';
    phone: string = '';
    email: string = '';
    gender: string = '';
    login: string = '';
    password: string = '';
    passwordValidation: string = '';
    constructor(
        name: string = '', firstName: string = '', address: string = '',
        zipCode: string = '', city: string = '', country: string = '',
        phone: string = '', email: string = '', gender: string = '', login: string = '',
        password: string = '', passwordValidation: string = '') {

        this.name = name;
        this.firstName = firstName;
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
        this.phone = phone;
        this.email = email;
        this.gender = gender;
        this.login = login;
        this.password = password;
        this.passwordValidation = passwordValidation;
    }

}