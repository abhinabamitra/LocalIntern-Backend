import { IsNotEmpty, IsEmail, IsMobilePhone } from "class-validator";
import { Column, Table, Model} from "sequelize-typescript";
import { IsDocquityEmail, IsValidPassword } from "../utils/validators/validators";
//import { Model } from "sequelize/dist";

@Table({
    tableName: 'register'
})

/**
 * This class is responsible for Parsing the Body of the request.
 * This class include class validators for validation purposes.
 */
export class users extends Model{
    @Column({
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    })
    Id: number;

    @Column ({
        allowNull: false,
    })
    @IsNotEmpty()
    Username: String;

    @Column({
        allowNull: false 
    })
    @IsNotEmpty()
    Firstname: String;

    @Column
    Lastname: String;

    @Column({
        allowNull: false,
        unique:true
    })
    @IsEmail()
    @IsDocquityEmail({message: "Please use Docquity Email!"})
    Email: String;

    @Column({
        allowNull: false
    })
    @IsNotEmpty()
    @IsValidPassword({message: 'Please use a Strong Password'})
    Password: String;

    @Column
    @IsMobilePhone()
    Mobile: String;
}