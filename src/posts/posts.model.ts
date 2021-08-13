import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role/role.model";
import {UserRoles} from "../role/user-roles.model";
import {User} from "../users/users.model";

interface PostCreationAttr {
	title: string;
	content: string;
	userId: number;
	image: string;
}

@Table({
	tableName: 'posts',
})
export class Post extends Model<Post, PostCreationAttr> {
   	@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
	id: number;

	@Column({type: DataType.STRING, allowNull: false})
	title: string;

	@Column({type: DataType.STRING, allowNull: false})
	content: string;

	@Column({type: DataType.STRING, allowNull: true})
	image: string;

	@ForeignKey(() => User)
	@Column({type: DataType.INTEGER})
	userId: number;

	@BelongsTo(() => User)
	author: User;
}