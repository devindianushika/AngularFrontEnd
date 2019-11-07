import { UserType } from './UserType.enum';

export class AuthenticationResponse {
    userType : UserType;
    object : Object;
    token : string;
}