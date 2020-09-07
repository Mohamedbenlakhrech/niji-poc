import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authservice.signup(authCredentialsDto);
    }

    @Post("/signin")
    signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authservice.signin(authCredentialsDto)
    }

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        return user;
    }
}
