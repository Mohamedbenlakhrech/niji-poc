import { Matches, MaxLength, MinLength, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    //@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
    password: string
}