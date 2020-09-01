import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';
import { AuthGuard } from '@nestjs/passport';

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
    test(@Req() req) {
        console.log(req);
    }
}
