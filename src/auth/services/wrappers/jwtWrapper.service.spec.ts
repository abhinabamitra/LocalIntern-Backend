import { JwtService } from "@nestjs/jwt"
import { Test, TestingModule } from "@nestjs/testing";
import { JwtWrapperService } from "./jwtWrapper.service";


describe('JwtWrapperService', ()=> {
    let service: JwtWrapperService;
    const token = "eyewkhgflksdhg.SFKH"
    const payload ={ 
        Email: 'abhinaba@docquity.com', 
        Username: 'abhi19', 
        Firstname: 'Abhinaba', 
        Lastname: 'Mitra'
    };


    const mockJwtService = {
        signAsync : jest.fn(()=> {
            return Promise.resolve(token);
        }),
        verifyAsync: jest.fn(()=> {
            return Promise.resolve(payload);
        }),
        decode: jest.fn(()=> {
            return payload;
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtWrapperService,
                { provide: JwtService, useValue: mockJwtService},
            ],
        }).compile();

        service = module.get<JwtWrapperService>(JwtWrapperService);
    })

    it('should return token string', async()=> {
        expect(await service.signPayload(payload)).toEqual(token);
    })

    it('should verify token', async()=> {
        expect(await service.verifyToken(token)).toEqual(payload);
    })

    it('should decode token', async()=> {
        expect(await service.decodeToken(token)).toEqual(payload);
    })
})