import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
	@ApiProperty({example: 'example@mail.com', description: 'Email пользователя'})
	@IsString({message: 'Должен быть строкой'})
	@IsEmail({}, {message: 'Некорректный email'})
	readonly email: string;
	@ApiProperty({example: 'paSsWord123', description: 'Пароль пользователя'})
	@IsString({message: 'Должен быть строкой'})
	@Length(5, 10, {message: 'От 5 до 10 символов'})
	readonly password: string;
}