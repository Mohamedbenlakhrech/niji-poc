import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model <User>) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().populate({ path: 'ads', select: 'title' }).exec();
        return users;
    }

    async createUser(createUserDto: CreateUserDTO): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return createdUser;
    }
}
