//@ts-check
import * as EmailValidator from 'email-validator';


export const isValidEmail = (email) => {
    return EmailValidator.validate(email);
} 