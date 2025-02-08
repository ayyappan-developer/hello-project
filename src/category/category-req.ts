import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryReq{
    
   @ApiProperty()
   @IsNotEmpty()
    title:string;

    @ApiProperty()
   // @IsNotEmpty({message: 'Email is required'})
    @IsNotEmpty()
    detail:string;


}
