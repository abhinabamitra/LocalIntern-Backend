import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { loginUser } from './dto/loginUser.dto';
import { JwtWrapperService } from './services/wrappers/jwtWrapper.service';

@Injectable()
export class AuthService {
    [x: string]: any;
    constructor(private usersService: UsersService,
        private jwtService:JwtWrapperService){}

    async validateUser( bodyparam?:loginUser ) {
        const user = await this.usersService.findOneByEmail(bodyparam.Email);
        if(!user) {
            throw new HttpException("Invalid Email", HttpStatus.UNAUTHORIZED);
        }
        if(bodyparam.Password == user.Password) {
            const jwtToken = await this.jwtService.signPayload(
                {
                    'Email': user.Email, 
                    'Username': user.Username, 
                    'Firstname': user.Firstname,
                    'Lastname' : user.Lastname
                }
            )
            const secretdata = {
                jwtToken,
                refreshToken:'',
            };
            return {
                'jwtToken': jwtToken,
                'user': user
            }
        }
        else {
            throw new HttpException("Invalid Password", HttpStatus.UNAUTHORIZED)
        }
    }
}
