import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable() 
export class JwtWrapperService {
    constructor(private readonly jwtService:JwtService) {}

    signPayload(payload:any): any {
        return this.jwtService.signAsync(payload);
    }

    verifyToken(token:string): any {
        return this.jwtService.verifyAsync(token);
    }

    decodeToken(token:string):any {
        return this.jwtService.decode(token);
    }
}