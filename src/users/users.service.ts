import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { updateUsers } from './dto/updateUser.dto';
import { users } from './users.model';

/**
 * This class is responsible for managing User CRUD operations.
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(users)
        private usersModel: typeof users,
    ) {}
    
    /**
     * This function creates a new User
     * 
     * @param body Expected following parameters in the request 
     * @returns This is http response
     */
    async createUser(body) {
        //const res = await this.usersModel.create(body);
        //console.log(res);
        //return await this.usersModel.create(body)
        try{
            const res = await this.usersModel.create(body);
            console.log(res);
            return res;
        }
        catch(err){
            throw new HttpException (
                "Email already exists", HttpStatus.BAD_REQUEST
            )
        }
    }

    /**
     * This function finds a User by Email
     * 
     * @param email Expected email param in the request
     * @returns This is http reponse
     */
    async findOneByEmail(email) {
        return await this.usersModel.findOne({
            where:{
                'email':email
            }
        })
    }

    async findOneByUsername(uname) {
        return await this.usersModel.findOne({
            where:{
                'username': uname
            }
        })
    }

    /**
     * This function returns all Users in DB
     * 
     * @returns This is http response
     */
    async findAll() {
        return await this.usersModel.findAll();
    }

    /**
     * This function updates by fetching the email from Req and updates user body
     * @param email Expected email param in the Request
     * @param user Expected updated user body
     * @returns This is a http response
     */
    async updateByUsername (
        email: string,
        user: updateUsers
    ) {
        var res =  await this.usersModel.update (user, {
            where:{
                'Email':email
            }
        })
        console.log(res[1]);
        if(res[0]==1){
            return res;
        }
        else{
            //return res;
            throw new HttpException("Email not found", HttpStatus.BAD_REQUEST)
        }
    }

}
