import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class GetUserItem{
    @ApiProperty()
    id:number;

   @ApiProperty()
    name:string;

    @ApiProperty()
    email:string;

}

export class GetUserRes{
    @ApiProperty({type:[GetUserItem]})
    data : GetUserItem[];
}