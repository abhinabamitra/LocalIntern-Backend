import { Contains, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsDocquityEmail } from "src/utils/validators/validators";

export class loginUser {

    @IsOptional()
    @IsEmail()
    @IsDocquityEmail({message: 'Please use Docquity Email'})
    Email: String;

    @IsOptional()
    @IsString()
    @MinLength(6,{message: 'Please use Password greater than or equal to 6 characrters'})
    Password: String;
}