import { IsNotEmpty, IsEmail, Contains, IsMobilePhone, MinLength, IsString } from "class-validator";
import { IsDocquityEmail, IsValidPassword } from "../../utils/validators/validators";

export class createUsers{
    //Id: number;

    @IsNotEmpty()
    Username: String;

    @IsNotEmpty()
    Firstname: String;

    @IsNotEmpty()
    Lastname: String;

    @IsEmail()
    //@Contains('docquity.com', {message: 'Please use Docquity Email'})
    @IsDocquityEmail({message: "Please use Docquity Email"})
    Email: String;

    @IsNotEmpty()
    //@IsString()
    //@MinLength(6,{message: 'Please use Password greater than or equal to 6 characrters'})
    @IsValidPassword({message: "Please use Strong Password"})
    Password: String;

    @IsMobilePhone()
    Mobile: String;
}