import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role/role.model";
import {UserRoles} from "../role/user-roles.model";

interface UserCreationAttr {
	email: string;
	password: string;
}

@Table({
	tableName: 'users',
})
export class User extends Model<User, UserCreationAttr> {
	@ApiProperty({example: 1, description: 'Уникальный идентификатор'})
	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@ApiProperty({example: 'example@mail.com', description: 'Email пользователя'})
	@Column({type: DataType.STRING, unique: true, allowNull: false})
	email: string;

	@ApiProperty({example: 'paSsWord123', description: 'Пароль пользователя'})
	@Column({type: DataType.STRING, allowNull: false})
	password: string;

	@ApiProperty({example: true, description: 'Статус бана пользователя'})
	@Column({type: DataType.BOOLEAN, defaultValue: false})
	banned: boolean;

	@ApiProperty({example: 'Spam', description: 'Причина бана пользователя'})
	@Column({type: DataType.STRING, allowNull: true})
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];
}