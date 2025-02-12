import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class categoryItemRes{
    
    @ApiProperty()
    id:number;

    @ApiProperty()
    title:string;

    @ApiProperty()
    detail:string;

    @ApiProperty()
    image:string;

}

export class CategoryRes{

    @ApiProperty({type:[categoryItemRes]})
    data : categoryItemRes[];

}