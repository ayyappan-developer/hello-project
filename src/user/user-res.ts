import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UserRes{
    @ApiProperty()
    id:number;

   @ApiProperty()
    name:string;

    @ApiProperty()
    email:string;

}