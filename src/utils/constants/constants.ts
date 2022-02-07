export const passwordPattern: RegExp = 
    /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$ %^&*()_+-={};':,.<>/?]).{8,})/;

export const EmailPattern: RegExp = 
    /^\w+([\.-]?\w+)*@docquity.com/;

export const jwtSecret: string = 'Specialkey';
export const jwtExpiryTimeout:string = '2000s';

export const sequelizeconf = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Shivam@19',
    database: 'Docquity_Intern'
}