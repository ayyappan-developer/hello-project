import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class FilterUserRequest {
    @ApiProperty()
    name: string;


  }
  