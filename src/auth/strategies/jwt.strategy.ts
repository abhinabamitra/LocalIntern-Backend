import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { jwtSecret, jwtExpiryTimeout } from 'src/utils/constants/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(private configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_TOKEN'),
            signOptions: {
                expiresIn: configService.get<string>('JWT_EXPIRY')
            }
        });
    }

    async validate(payload: any) {
        console.log(payload)
        return { Email: payload.Email, Username: payload.Username, Firstname: payload.Firstname, Lastname:payload.Lastname};
    }
}