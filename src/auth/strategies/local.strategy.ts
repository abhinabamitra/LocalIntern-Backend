import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor (private authService: AuthService) {
        super({ usernameField: 'Email', passwordField: 'Password' });
    }

    async validate(email: string, password:string): Promise<any> {
        console.log(email, password)
        return {
            email: email,
            password: password
        };
    }
}