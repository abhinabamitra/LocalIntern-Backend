import { Controller, Post, UseGuards, Header, Body, Req, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { loginUser } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Header('Content-Type','application/json')
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Body() bodyparam:loginUser){
        console.log(bodyparam)
        const userdata = this.authService.login(bodyparam);
        return userdata;
    }
}
