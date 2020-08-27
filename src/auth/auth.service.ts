import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model <User>) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const user = new this.userModel(authCredentialsDto);
        user.username = username;
        user.password = password;
        await user.save();
        return user;
    }
}
