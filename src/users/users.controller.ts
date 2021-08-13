import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles-guard";
import {AddRoleDto} from "./dto/addRole.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {
	}
	@ApiOperation({summary: 'Создание пользователя'})
	@ApiResponse({status: 200, type: User})
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}
	@ApiOperation({summary: 'Получение списка пользователей'})
	@ApiResponse({status: 200, type: [User]})
	@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({summary: 'Выдать роль'})
	@ApiResponse({status: 200})
	@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({summary: 'Забанить пользователя'})
	@ApiResponse({status: 200})
	@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}
}
