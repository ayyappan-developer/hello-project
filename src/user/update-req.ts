import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserRequest {
    @ApiProperty()
    name: string;


    @ApiProperty()
    @IsEmail()
    email: string;


  }
  