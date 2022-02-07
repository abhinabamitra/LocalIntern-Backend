import { IsNotEmpty, IsEmail, Contains, IsMobilePhone, MinLength, IsString, IsOptional } from "class-validator";
import { IsValidPassword } from "../../utils/validators/validators";

export class updateUsers {

    @IsNotEmpty()
    @IsOptional()
    Firstname: String;

    @IsOptional()
    Lastname: String;

    @IsNotEmpty()
    //@IsString()
    //@MinLength(6,{message: 'Please use Password greater than or equal to 6 characrters'})
    @IsValidPassword({message:'Please use Strong Password'})
    @IsOptional()
    Password: String;

    @IsMobilePhone()
    @IsOptional()
    Mobile: String;
}