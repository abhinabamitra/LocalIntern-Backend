import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { jwtSecret, jwtTimer } from 'src/utils/constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
            signOptions: {
                expiresIn: jwtTimer
            }
        });
    }

    async validate(payload: any) {
        console.log(payload)
        return { Email: payload.Email, Username: payload.Username, Firstname: payload.Firstname, Lastname:payload.Lastname};
    }
}