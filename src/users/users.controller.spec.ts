import { Test, TestingModule } from "@nestjs/testing";
import { createUsers } from "./dto/createUser.dto";
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";

describe('UserController', ()=>{
    let controller: UsersController;

    const userDto = {
        Username: 'abhi19',
        Email: 'abhinaba@docquity.com',
        Password: 'Shivam@19',
        Firstname: 'Abhinaba',
        Lastname: 'Mitra',
        Mobile: '7550930806',
    }

    const mockUserService = {
        createUser: jest.fn(dto => {
            return {
                Id: Math.floor(Math.random() * 1000),
                ...dto,
            }
        }),

        updateByUsername: jest.fn((email,dto) => {
            return {
                Email: email,
                ...dto
            }
        }),

        findOneByEmail: jest.fn((email)=> {
            return userDto
        })
    }


    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).overrideProvider(UsersService).useValue(mockUserService).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create an user', () => {
        const dto = {
            Username:"abhi19",
            Firstname:"Abhinaba",
            Lastname:"Mitra",
            Email:"abhinaba@docquity.com",
            Password:"Shivam@19",
            Mobile:"7550930806"
        }

        expect(controller.createUser(dto)).toEqual({
            Id: expect.any(Number),
            ...dto
        })

        expect(mockUserService.createUser).toHaveBeenCalledWith(dto);
    })

    it('should update an user', () => {
        const dto = {
            Firstname:"Abhinaba",
            Lastname:"Mitra",
            Password:"Shivam@19",
            Mobile:"7550930806"
        };

        expect(controller.updateByUsername('abhinaba@docquity.com', dto)).toEqual({
            Email: 'abhinaba@docquity.com',
            ...dto
        })
    })

    it('should find one by email', async () => {
        expect(await controller.findOneByEmail('abhinaba@docquity.com')).toEqual(userDto);
    })

    it('should throw NOT_FOUND Error when not found user by email', async()=>{
        try{
            await controller.findOneByEmail('abhinaba@docquity.com')
        }
        catch(e){
            expect(e.message).toBe("Does Not Exist");
        }
    })
});