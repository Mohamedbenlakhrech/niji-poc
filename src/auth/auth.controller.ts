import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice: AuthService) {}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authservice.signup(authCredentialsDto);
    }

    @Post("/signin")
    signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
        return this.authservice.validatePassword(authCredentialsDto)
    }
}
