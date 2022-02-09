import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
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

    it('user should be updated', async function () {
        const dto = {
            Username: 'abhi19',
            Firstname: 'Abhinaba',
            Lastname: 'Mitra',
            Mobile: '7550930806',
        };

        expect(await service.findOneByEmail('abhinaba@docquity.com'));
    });
});