import { Identity } from './identity';

export interface UserRegistration {
    token: string;
    refreshToken: string;
    identity: Identity;
}