import { Body, Controller, Header, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards, Request, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUsers } from './dto/createUser.dto';
import { updateUsers } from './dto/updateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';


/**
 * This class is responsible for controlling User CRUD operations.
 * It has 3 functionalities as of now.
 */
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * This function creates an User
   * @param reqBody Expected parameter of type users from users.model
   * @returns This function connects createUser function in users.service
   */
  @Post('createUser')
  createUser(@Body() reqBody: createUsers) {
    console.log("User registered Successfully");
    console.log("Body", reqBody);
    return this.usersService.createUser(reqBody);
  }

  @Post('test')
  async testee(@Body() data) {
    await console.log(data);
  }

  /**
   * This function returns all Users
   * @returns connects to findAll in users.service
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async findAll(@Req() req:any, @Request() request) {
    const response = await this.usersService.findAll();
    if(req.cookies['auth_cookie'] == 'true')
    {
      return response;
      //return await this.usersService.findAll();
    }
    else if(req.cookies['auth_cookie']=='false') {
      return [request.user];
    }
  }

  /**
   * This function returns details of this.email
   * @param query Expected Parameter of type email string
   * @returns JSON object from database 
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('users/email/:Email')
  async findOneByEmail(@Param('Email') query: string) {
    const user = await this.usersService.findOneByEmail(query);
    if (user) {
      return user;
    }
    else {
      throw new HttpException('Does Not Exist', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('users/username/:Username')
  async findOneByUsername(@Param('Username') uname: string) {
    const user = await this.usersService.findOneByUsername(uname)
    if (user) {
      return user;
    }
    else {
      throw new HttpException('Does Not Exist', HttpStatus.NOT_FOUND);
    }
  }

  @Patch('users/update/:Email')
  updateByUsername(
    @Param('Email') email: string, @Body() user: updateUsers
  ) {
    return this.usersService.updateByUsername(
      email, user
    );
  }

  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard('jwt'))
  @Get("profile")
  async getProfile(@Request() req: any, @Res({passthrough:true}) res: Response) {
    res.cookie('auth_cookie', 'true',
      {
        httpOnly: true,
        secure: false,
        sameSite: true,
        expires: new Date(Number(new Date()) + 60 * 60 * 1000),
        path: '/users',
        domain: '127.0.0.1', 
      });
    console.log(req.user);
    return req.user;
  }

  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  async logout(@Req() req:any, @Res({passthrough:true}) response:any){
    response.cookie('auth_cookie', req.cookie.auth_cookie,{
      httpOnly:true,
      secure:false,
      sameSite:true,
      path:'/users',
      domain:'127.0.0.1',
      expires: new Date(Number(new Date()) - 60 * 60)
    });
  }
}
