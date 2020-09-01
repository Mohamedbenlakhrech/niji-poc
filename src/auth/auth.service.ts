import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private userModel: Model <User>) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const exits = await this.userModel.findOne({ username });
        if(exits) {
            throw new ConflictException('Username already exists');
        }

        const user = new this.userModel(authCredentialsDto);
        user.username = username; 
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt); 

        try {
            await user.save();
            return user;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    /*async signin(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const exists = await this.userModel.findOne({ username });
        if(exists)
    }*/

    // hash password for signup
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    // validate password for signin
    async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ username });

        if(user) {
            // compare password
            const validPassword = await bcrypt.compare(password, user.password);
            console.log(`Plain pass ${password} | User pass ${user.password}`)
            console.log(validPassword)
            if(validPassword) {
                return username;
            } else {
                throw new UnauthorizedException('Invalid credentials');
            }            
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
