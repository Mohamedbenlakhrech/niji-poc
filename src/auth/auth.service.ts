import { Injectable, ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/authCrednetialsDto.dto';
import { User } from 'src/users/schemas/user.schema';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model <User>,
        private jwtService: JwtService
        ) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { userName, password } = authCredentialsDto;

        const exits = await this.userModel.findOne({ userName });
        if(exits) {
            throw new ConflictException('Username already exists');
        }

        const user = new this.userModel(authCredentialsDto);
        user.userName = userName; 
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt); 

        try {
            await user.save();
            return user;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const userName = await this.validatePassword(authCredentialsDto);
        if (!userName) {
            throw new UnauthorizedException("Invalid credentials");
        }
        // Else generate the token
        const payload: JwtPayload = { userName };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }

    // hash password for signup
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    // validate password for signin
    private async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { userName, password } = authCredentialsDto;
        const user = await this.userModel.findOne({ userName });

        if(user) {
            // compare password
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword) {
                return userName
            } else {
                throw new UnauthorizedException('Invalid credentials');
            }            
        } else {
            throw new NotFoundException('User not found');
        }
    }
}
