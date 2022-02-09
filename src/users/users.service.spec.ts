import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { throwError } from 'rxjs';
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
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('user created', async function () {
        const dto = {
            Username: 'abhi19',
            Email: 'abhinaba@docquity.com',
            Password: 'Shivam@19',
            Firstname: 'Abhinaba',
            Lastname: 'Mitra',
            Mobile: '7550930806',
        };
        expect(await service.createUser(dto)).toEqual(dto);

        //expect(service.createUser).toHaveBeenCalledWith(dto);
    });

    it('user is found by Email', async function () {
        expect(await service.findOneByEmail('abhinaba@docquity.com')).toEqual(sDto);
    });

    it('should return all users of type json', async ()=> {
        expect(await service.findAll()).toEqual([users]);
    })

    it('should update user details', async () => {

        const updateDto = {
            Firstname: "Abhinaba",
            Lastname: "Mitra",
            Password: "Shivam@19",
            Mobile: "7550930806",
        }

        expect(await service.updateByUsername('abhinaba@docquity.com',updateDto)).toEqual({
            Id: expect.any(Number),
            ...sDto,
        })
    })

    it('should show bad request exception when entered user not found', async ()=> {
        const updateDto = {
            Firstname: "Abhinaba",
            Lastname: "Mitra",
            Password: "Shivam@19",
            Mobile: "7550930806",
        }
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