import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CategoryReq{

   @ApiProperty()
   @IsNotEmpty({message: 'title is required'})
    title:string;

    @ApiProperty()
    detail:string;

    @ApiProperty()
    image:string;

}
