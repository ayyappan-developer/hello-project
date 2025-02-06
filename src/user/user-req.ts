import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserReq{
   @ApiProperty()
   @IsNotEmpty()
    name:string;

    @ApiProperty()
   // @IsNotEmpty({message: 'Email is required'})
    @IsNotEmpty()
    @IsEmail()
    email:string;


}
