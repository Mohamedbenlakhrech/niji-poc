import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers(): Promise <User[]> {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDTO): Promise <User> {
        return this.usersService.createUser(createUserDto);
    }
}
