import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
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
