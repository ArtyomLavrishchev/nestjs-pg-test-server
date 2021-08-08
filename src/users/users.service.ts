import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleService} from "../role/role.service";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User,
		private roleService: RoleService) {
	}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('admin');
		await user.$set('roles', [role.id])
		user.roles = [role];
		return user;
	}

	async getAllUsers() {
		return await this.userRepository.findAll({include: {all: true}});
	}

	async getUserByEmail(email: string) {
		return this.userRepository.findOne({where: {email}, include: {all: true}});
	}

}
