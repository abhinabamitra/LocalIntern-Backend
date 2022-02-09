import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { loginUser } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtWrapperService } from './services/wrappers/jwtWrapper.service';
import { users } from '../users/users.model';

const sDto = {
    Username: 'abhi19',
    Email: 'abhinaba@docquity.com',
    Password: 'Shivam@19',
    Firstname: 'Abhinaba',
    Lastname: 'Mitra',
    Mobile: '7550930806',
}
const loginres = {
    jwtToken: "eyJeyJFbWFpzMjg0MDh9",
    user: {
        //Id: 8,
        Username: "abhi19",
        Firstname: "Abhinaba",
        Lastname: "Mitra",
        Email: "abhinaba@docquity.com",
        Password: "Shivam@19",
        Mobile: "7550930806",
        //createdAt: "2022-01-18T11:22:54.000Z",
        //updatedAt: "2022-01-18T11:22:54.000Z"
    }
}

describe('UserService', () => {
    let service: AuthService;

    const mockUsersService = {
        findOneByEmail: jest.fn((dto) => {
            return Promise.resolve(sDto);
        })
    };

    const mockJwtWrapperService = {
        signPayload: jest.fn(() => {
            return loginres.jwtToken;
        })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: mockUsersService},
                { provide: JwtWrapperService, useValue: mockJwtWrapperService},
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('user logged in', async function () {
        const dto = {
            Email: 'abhinaba@docquity.com',
            Password: 'Shivam@19',
        };
        expect(await service.login(dto)).toEqual(loginres);
    });

    // it('should throw Unauthorized Exception', () => {
    //     const dto = {
    //         Email: 'abhinaba@docquity.com',
    //         Password: 'Shivam12@19',
    //     };
    //     expect(()=> {
    //         service.login(dto)
    //     }).toThrowError("Invalid Password!")
    // })
});

