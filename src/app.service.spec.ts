import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

describe('AppService', ()=> {
    let appService: AppService
    const str = "Hello World!"

    const mockappservice = {
        getHello: jest.fn(()=> {
            return str;
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                { provide: AppService, useValue: mockappservice }
            ]
        }).compile();
    
        appService = module.get<AppService>(AppService);
    });

    it('should have function getHello', async ()=> {
        expect(appService.getHello()).toEqual(str);
    })
})