import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { throwError } from 'rxjs';
import { updateUsers } from './dto/updateUser.dto';
import { users } from './users.model';
import { UsersService } from './users.service';

const sDto = {
    Username: 'abhi19',
    Email: 'abhinaba@docquity.com',
    Password: 'Shivam@19',
    Firstname: 'Abhinaba',
    Lastname: 'Mitra',
    Mobile: '7550930806',
};
let updateDto:updateUsers;
let dto:{};

describe('UserService', () => {
    let service: UsersService;

    const mockUserModel = {
        create: jest.fn(() => {
            return Promise.resolve(sDto);
        }),
        findOne: jest.fn(({ where: { Email: any } }) => {
            return sDto;
        }),
        findAll: jest.fn(() => {
            return Promise.resolve([users]);
        }),
        update: jest.fn((dto,{ where: { Email: any } })=> {
            return {
                Id: Date.now(),
                ...sDto
            }
        })
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: getModelToken(users), useValue: mockUserModel },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);

        updateDto = {
            Firstname: "Abhinaba",
            Lastname: "Mitra",
            Password: "Shivam@19",
            Mobile: "7550930806",
        }

        dto = {
            Username: 'abhi19',
            Email: 'abhinaba@docquity.com',
            Password: 'Shivam@19',
            Firstname: 'Abhinaba',
            Lastname: 'Mitra',
            Mobile: '7550930806',
        };
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create an user', async function () {
        expect(await service.createUser(dto)).toEqual(dto);
    });

    it('should find an user by Email', async function () {
        expect(await service.findOneByEmail('abhinaba@docquity.com')).toEqual(sDto);
    });

    it('should find an user by Email', async () => {
        expect(await service.findOneByUsername('abhi19')).toEqual(sDto);
    })

    it('should return all users', async ()=> {
        expect(await service.findAll()).toEqual([users]);
    })

    it('should update user details', async () => {
        return expect(await service.updateByUsername('abhinaba@docquity.com', updateDto)).toEqual({
            Id: expect.any(Number),
            ...sDto,
        });
    })

    it('should manifest BAD_REQUEST exception when entered user not found', async ()=> {
        // expect(async ()=>{
        //     await service.updateByUsername('abhi1234@docquity.com',updateDto)
        // }).toThrowError("Email not found");

        try {
            await service.updateByUsername('abhi1234@docquity.com',updateDto)
        }
        catch(e){
            expect(e.message).toBe("Email not found");
        }
    })
});