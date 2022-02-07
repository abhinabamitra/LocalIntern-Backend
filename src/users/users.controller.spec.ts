import { Test, TestingModule } from "@nestjs/testing";
import { createUsers } from "./dto/createUser.dto";
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";

describe('UserController', ()=>{
    let controller: UsersController;

    const mockUserService = {

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
});