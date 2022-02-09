import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service";

describe('UserController', ()=>{
    let controller: AuthController;
    let service: AuthService;

    const loginres = {
        jwtToken: "eyJeyJFbWFpzMjg0MDh9",
        user: {
            Id: 8,
            Username: "abhi19",
            Firstname: "Abhinaba",
            Lastname: "Mitra",
            Email: "abhinaba@docquity.com",
            Password: "Shivam@19",
            Mobile: "7550930806",
            createdAt: "2022-01-18T11:22:54.000Z",
            updatedAt: "2022-01-18T11:22:54.000Z"
        }
    }

    const mockAuthService = {
        login: jest.fn(logindto => {
            return loginres;
        })
    }

    beforeEach(async()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        }).overrideProvider(AuthService).useValue(mockAuthService).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should be logged in', () => {
        const logindto = {
            Email:"abhinaba@docquity.com",
            Password:"Shivam@19"
        }
        
        expect(controller.login(logindto)).toEqual(
            loginres
        );
    });
});