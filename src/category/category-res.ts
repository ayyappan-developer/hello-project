import { ApiProperty } from "@nestjs/swagger";

export class CategoryRes{

    @ApiProperty()
    id:number;

   @ApiProperty()
    title:string;

    @ApiProperty()
    detail:string;
}
